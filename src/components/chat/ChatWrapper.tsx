"use client";

import { trpc } from "@/app/_trpc/client";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { UploadStatus } from "@prisma/client";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ChatContextProvider } from "./ChatContext";
import { useEffect } from "react";

interface ChatWrapperProps {
  fileId: string;
  isSubscribed: boolean;
}

const ChatWrapper = ({ fileId, isSubscribed }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery({
    fileId,
  });

  useEffect(() => {
    if (!data) return;

    if (data.status === "SUCCESS") {
      // Upload succeeded, do something
    } else if (data.status === "FAILED") {
      // Upload failed, do something else
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            <h3 className="font-semibold text-xl">Loading...</h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  if (data?.status === "PROCESSING") {
    console.log("Process");
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            <h3 className="font-semibold text-xl">Processing...</h3>
            <p className="text-zinc-500 text-sm">This won&apos;t take long.</p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );
  }

  if (data?.status === "FAILED") {
    console.log("Fail");
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500 animate-bounce" />
            <h3 className="font-semibold text-xl">Too many pages in PDF</h3>
            <p className="text-zinc-500 text-sm">
              Your <span className="font-medium">Free</span> plan suports up to
              20 pages.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="h-3 w-3 mr-1.5" />
              Back
            </Link>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );
  }

  return (
    <ChatContextProvider fileId={fileId}>
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200  flex-col justify-between gap-2">
        <div className="flex-1 justify-between flex flex-col mb-28">
          <Messages fileId={fileId} />
        </div>

        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
