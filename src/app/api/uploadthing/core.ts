import { db } from "@/db";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";


import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { getPineconeClient } from '@/lib/pinecone'
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { PLANS } from "@/app/config/stripe";

 
const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) throw new Error('Unauthorized')

  const subscriptionPlan = 
    await getUserSubscriptionPlan()

  return { subscriptionPlan, userId: user.id}
}
 
const onUploadComplete = async({
  metadata, file
}: {
  metadata: Awaited<ReturnType<typeof middleware>>
  file: {
    key: string
    name: string
    url: string
  }
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  })

  if (isFileExist) return

  const { subscriptionPlan } = metadata
  const { isSubscribed } = subscriptionPlan

  const createdFiles = await db.file.count({
    where: {
      userId: metadata.userId,
    },
  });

  if (!isSubscribed && createdFiles >= 1) {
    throw new UploadThingError("You have reached your file limit.");
  }

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      //url: `https://uploadthing.s3.us-west-2.amazonaws.com/${file.key}`,
      url: `https://utfs.io/f/${file.key}`,
      uploadStatus: "PROCESSING",
    },
  });

  try{
    const responce = await fetch(`https://utfs.io/f/${file.key}`)
    const blob = await responce.blob()

    const loader = new PDFLoader(blob)

    const pageLevelDocs = await loader.load()

    const pagesAmt = pageLevelDocs.length
    const { subscriptionPlan } = metadata
    const { isSubscribed } = subscriptionPlan
    

    
    


    const isProExceeded =
      pagesAmt >
      PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPdf
    const isFreeExceeded =
      pagesAmt >
      PLANS.find((plan) => plan.name === 'Free')!.pagesPerPdf
    const Ch = PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPdf
    console.log(isProExceeded, isFreeExceeded, pagesAmt, Ch)

    if (
      (isSubscribed && isProExceeded) ||
      (!isSubscribed && isFreeExceeded)
    ) {
      await db.file.update({
        data: {
          uploadStatus: 'FAILED',
        },
        where: {
          id: createdFile.id,
        },
      })
    }

    // vectorize all 
    const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.Index("chat-pdf")

    const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

await PineconeStore.fromDocuments(
  pageLevelDocs,
  embeddings,
  {
    pineconeIndex,
    namespace: createdFile.id,
  }
)

await db.file.update({
  data: {
    uploadStatus: 'SUCCESS',
  },
  where: {
    id: createdFile.id,
  },
})
} catch (err) {
await db.file.update({
  data: {
    uploadStatus: 'FAILED',
  },
  where: {
    id: createdFile.id,
  },
})
}
}
 

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: "8MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter