import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PlayCircleIcon, StarsIcon, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import PriceTool from "@/components/priceTool";
import FeatureSec from "@/components/FeatureSec";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper calssName="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-canter text-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Chat with any <span className="text-orange-600">PDF</span> document
          </h1>
          <p className="text-gray-600 mb-8">
            From legal agreements to financial reports, PDF To Chat brings your
            documents
            <br />
            to life. You can ask questions, get summaries, find information, and
            more.
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-6 ">
          <Link
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "mt-5",
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

        <div className="flex items-center mb-12">
          <div className="flex justify-center items-center mr-6">
            <img
              src="https://placehold.co/32x32"
              alt="User profile placeholder image"
              className="rounded-full border-2 border-white -ml-2"
            />
            <img
              src="https://placehold.co/32x32"
              alt="User profile placeholder image"
              className="rounded-full border-2 border-white -ml-2"
            />
            <img
              src="https://placehold.co/32x32"
              alt="User profile placeholder image"
              className="rounded-full border-2 border-white -ml-2"
            />
            <img
              src="https://placehold.co/32x32"
              alt="User profile placeholder image"
              className="rounded-full border-2 border-white -ml-2"
            />
            <img
              src="https://placehold.co/32x32"
              alt="User profile placeholder image"
              className="rounded-full border-2 border-white -ml-2"
            />
          </div>
          <div className="text-centerflex justify-center items-center">
            <div className="text-orange-400 flex items-center mb-1">
              <i className="fas fa-star">
                <Star fill="yellow" className="h-5 w-5" />
              </i>
              <i className="fas fa-star">
                <Star fill="yellow" className="h-5 w-5" />
              </i>
              <i className="fas fa-star">
                <Star fill="yellow" className="h-5 w-5" />
              </i>
              <i className="fas fa-star">
                <Star fill="yellow" className="h-5 w-5" />
              </i>
              <i className="fas fa-star">
                <Star fill="yellow" className="h-5 w-5" />
              </i>
              <span className="text-gray-600 ml-2">5.0</span>
            </div>
            <span className="text-gray-600">From 20,000+ reviews</span>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-8 flow-root sm:mt-8">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <video
                    width="1364"
                    height="866"
                    controls
                    preload="none"
                    className="rounded-md bg-white p-2  shadow-2xl ring-1 ring-gray-900/10"
                  >
                    <source src="/path/to/video.mp4" type="video/mp4" />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center sm:mt-24">
            <h1 className="text-zinc-600 mb-20 text-xl sm:text-3xl">
              Honored to serve students from all Ivy League schools 🫶
            </h1>
            <div className="flex flex-wrap justify-center mt-4 gap-3 sm:justify-center sm:items-center">
              <Image
                src="/uni/1.png"
                alt="Brown University logo"
                className="mx-2 xs:w-8 sm:w-16 md:w-24 lg:w-32"
                width={200}
                height={200}
              />
              <Image
                src="/uni/2.png"
                alt="Cornell University logo"
                className="mx-2 xs:w-8 sm:w-16 md:w-24 lg:w-32"
                width={200}
                height={200}
              />
              <Image
                src="/uni/3.png"
                alt="Dartmouth College logo"
                className="mx-2 xs:w-8 sm:w-16 md:w-24 lg:w-32"
                width={200}
                height={200}
              />
              
              <Image
                src="/uni/5.png"
                alt="University of Pennsylvania logo"
                className="mx-2 xs:w-8 sm:w-16 md:w-24 lg:w-32"
                width={200}
                height={200}
              />
              <Image
                src="/uni/6.png"
                alt="Princeton University logo"
                className="mx-2 xs:w-8 sm:w-16 md:w-24 lg:w-32"
                width={200}
                height={200}
              />
              <Image
                src="/uni/7.png"
                alt="Yale University logo"
                className="mx-2 xs:w-8 sm:w-16 md:w-24 lg:w-32"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-16 mt-24 max-w-5xl sm:mt-24">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <p className="mt-4 text-lg text-orange-600">Features</p>
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-4xl">
              PDF to Chat is built for any usecase
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Be it books, scientific papers, financial reports, product user
              manuals, legal documents or employee training documents. We got
              you covered.
            </p>
          </div>
        </div>
        <FeatureSec/>
        

        {/* Pricing section */}
        <div className="mb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <p className="mt-4 text-lg text-orange-600">Pricing</p>
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-4xl">
              Can you put a price on productivity?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Save your precious time. You are just a small investment away from
              10xing your productivity.
            </p>
          </div>
        </div>
        <PriceTool></PriceTool>

        <div className="text-center mt-24">
          <h1 className="text-5xl font-bold mb-4">
            Start for <span className="text-orange-600">free</span> now
          </h1>
          <p className="text-gray-600 mb-8 text-xl">
          Join over 400,000+ people already saving time with PDF to Chat.
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <Link
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "mt-5",
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

        

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/file-upload-preview.jpg"
                alt="uploading preview"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-2 md:p-2 shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
