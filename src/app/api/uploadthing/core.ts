import { db } from "@/db";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";


import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { getPineconeClient } from '@/lib/pinecone'

 
const f = createUploadthing();
 

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "64MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
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

        const pageAmt = pageLevelDocs.length

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
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter