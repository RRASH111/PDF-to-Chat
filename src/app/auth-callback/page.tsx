"use client";

import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const AuthCallbackPage = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackContent router={router} />
    </Suspense>
  );
};

const AuthCallbackContent = ({ router }: { router: any }) => {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }: { success: boolean }) => {
      if (success) {
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (err: any) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/api/auth/login? ");
      }
    },
    retry: true,
    retryDelay: 500,
  } as any);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
