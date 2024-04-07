"use client";

import { use, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

import Dropzone from "react-dropzone";
import { Cloud, File, Loader2, XCircle } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UploadDropzone = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();
  const { startUpload } = useUploadThing(
    isSubscribed ? "proPlanUploader" : "freePlanUploader"
  );

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const { data: files } = trpc.getUserFiles.useQuery();

  const cantUpload = files && files.length >= 1 && !isSubscribed;

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 2.5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatedProgress();

        // hande upload here
        const res = await startUpload(acceptedFile);

        if (!res) {
          return toast({
            title: "Upload failed",
            description: "Something went wrong while uploading the file",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;

        const key = fileResponse.key;

        if (!key) {
          return toast({
            title: "Upload failed",
            description: "Something went wrong while uploading the file",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center h-full w-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="w-6 h-6 text-zinc-500 mb-2" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to Upload</span> or drag
                  and drop a file here.
                </p>
                <p className="text-xs text-zinc-500">
                  PDF (up to {isSubscribed ? "32" : "8"}MB)
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200 rounded-md"
                  />
                  {uploadProgress === 100 ? (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-zinc-500">Redirecting...</p>
                    </div>
                  ) : (
                    <>
                      {cantUpload ? (
                        <>
                          <div className="flex gap-1 items-center justify-center text-sm text-red-600 pt-2 text-center">
                            You reached the upload limit.
                          </div>
                          <p className="flex gap-1 items-center justify-center text-xs text-zinc-400 pt-2 text-center">
                            Please upgrade to the{" "}
                            <Link
                              href="/pricing"
                              className="text-orange-600 underline"
                            >
                              PRO
                            </Link>
                            plan to upload more files.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="flex gap-1 items-center justify-center text-sm text-zinc-400 pt-2 text-center">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Preparing your AI knowledge base...
                          </div>
                          <p className="flex gap-1 items-center justify-center text-xs text-zinc-400 pt-2 text-center">
                            This might take a while
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
          {cantUpload ? (
            <>
              <div className="flex gap-1 items-center justify-center text-sm text-red-400 pt-2 text-center">
                <XCircle className="h-3 w-3 text-red-400 " />
                Upgrade to the{" "}
                <Link href="/pricing" className="text-orange-600 underline">
                  PRO
                </Link>{" "}
                plan to upload more files.
              </div>
            </>
          ) : null}
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        setIsOpen(v); // Update isOpen state directly
      }}
    >
      <DialogTrigger
        onClick={() => {
          if (!isOpen) {
            // Check if the dialog is not already open
            setIsOpen(true);
          }
        }}
        asChild
      >
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  );
};
export default UploadButton;
