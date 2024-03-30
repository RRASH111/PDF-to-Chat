import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, PlayCircleIcon } from "lucide-react";
import Image from "next/image";



const FeatureSec = () => {
  return (
    <MaxWidthWrapper calssName="w-max-screen">
    <div className="min-h-screen w-max-screen bg-gradient-to-r from-orange-500 via-orange-500 to-amber-400 bg-clip-text text-transparent">
      <div className="py-20 w-8xl ">
        <div className="max-w-8xl mx-auto">
         
          <div className="grid grid-cols-1 my-5 md:grid-cols-2 gap-16">
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Upload documents
              </h2>
              <p className="text-gray-600 text-lg mb-8">
              Simply upload the PDF documents you’d like to chat with. 1 click upload and you’re ready to go.
              </p>
              <div className="flex space-x-4">
              <Link
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "mt-5 text-black",
            })}
            href="/dashboard"
            target="_blank"
          >
            Demo <PlayCircleIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link
            className={buttonVariants({
              size: "lg",

              className: "mt-5",
            })}
            href="/dashboard"
            target="_blank"
          >
            Get started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
              </div>
            </div>
            <div>
                <Image
                    src='/feature/1.png'
                    alt="Tablet displaying a document with text and graphs, with an interface overlay for asking questions and getting AI responses"
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                />
              
            </div>
          </div>
          <div className="grid grid-cols-1 my-5 md:grid-cols-2 gap-16 mt-16">
            <div>
            <Image
                    src='/feature/2.png'
                    alt="Tablet displaying a document with text and graphs, with an interface overlay for asking questions and getting AI responses"
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                />
              
            </div>
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Instant Answers
              </h2>
              <p className="text-gray-600 text-lg mb-8">
              Ask questions, extract information, and summarize documents with AI. We give you instantaneous answers. Just ask.
              </p>
              <div className="flex space-x-4">
              <Link
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "mt-5 text-black",
            })}
            href="/dashboard"
            target="_blank"
          >
            Demo <PlayCircleIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link
            className={buttonVariants({
              size: "lg",

              className: "mt-5",
            })}
            href="/dashboard"
            target="_blank"
          >
            Get started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 my-5 md:grid-cols-2 gap-16">
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Sources included
              </h2>
              <p className="text-gray-600 text-lg mb-8">
              Every response is backed by sources. extracted from the uploaded document. Our AI won’t stray or give you its “opinion”.
              </p>
              <div className="flex space-x-4">
              <Link
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "mt-5 text-black",
            })}
            href="/dashboard"
            target="_blank"
          >
            Demo <PlayCircleIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link
            className={buttonVariants({
              size: "lg",

              className: "mt-5",
            })}
            href="/dashboard"
            target="_blank"
          >
            Get started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
              </div>
            </div>
            <div>
            <Image
                    src='/feature/1.png'
                    alt="Tablet displaying a document with text and graphs, with an interface overlay for asking questions and getting AI responses"
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                />
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </MaxWidthWrapper>
  );
};

export default FeatureSec;
