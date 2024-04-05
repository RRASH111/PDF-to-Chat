import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UpgradeButton from "@/components/UpgradeButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLANS } from "@/app/config/stripe";
import { cn } from "@/lib/utils";
import {
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";

const PriceTool = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const pricingItems = [
    {
      plan: "Free",
      tagline: "Free plan, test the waters before you jump in.",
      quota: 1,
      features: [
        {
          text: "20 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "50 Questions limit",
        },
        {
          text: "8MB max file size",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Basic support",
          negative: false,
        },

        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "Advanced features for those who are serious.",
      quota: PLANS.find((p) => p.slug === "pro")!.quota,
      features: [
        {
          text: "2000 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "Unlimited Questions",
        },
        {
          text: "32MB max file size",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Chat & email support",
        },

        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
        },
      ],
    },
  ];

  return (
    <div className="pt-15 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <TooltipProvider>
        {pricingItems.map(({ plan, tagline, quota, features }) => {
          const price =
            PLANS.find((p) => p.slug == plan.toLowerCase())?.price.amount || 0;

          return (
            <div
              key={plan}
              className={cn("relative rounded-2xl bg-white shadow-lg", {
                "border-2 border-orange-600 shadow-blue-200": plan === "Pro",
                "border border-gray-200": plan !== "Pro",
              })}
            >
              {plan === "Pro" && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-3 py-2 text-sm font-medium text-white">
                  Upgrade now
                </div>
              )}

              <div className="p-5">
                <h3 className="my-3 text-center font-display text-3xl font-bold">
                  {plan}
                </h3>
                <p className="text-gray-500 text-center">{tagline}</p>
                <p className="my-5 font-display text-center text-6xl font-semibold">
                  ${price}
                </p>
                <p className="text-gray-500 text-center">per month</p>
              </div>

              {plan === "Pro" && (
                <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-1">
                    <p>
                      <span className="text-orange-600 shadow-orange-200">
                        Unlimited
                      </span>{" "}
                      Uploads
                    </p>

                    <Tooltip delayDuration={300}>
                      <TooltipTrigger className="cursor-default ml-1.5">
                        <HelpCircle className="h-4 w-4 text-zinc-500" />
                      </TooltipTrigger>
                      <TooltipContent className="w-55 p-2">
                        You can upload Unlimited PDFs.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              )}

              {plan === "Free" && (
                <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-1">
                    <p>{quota.toLocaleString()} PDF upload limit</p>

                    <Tooltip delayDuration={300}>
                      <TooltipTrigger className="cursor-default ml-1.5">
                        <HelpCircle className="h-4 w-4 text-zinc-500" />
                      </TooltipTrigger>
                      <TooltipContent className="w-80 p-2">
                        How many PDFs you can upload per month.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              )}

              <ul className="my-10 space-y-5 px-8">
                {features.map(({ text, footnote, negative }) => (
                  <li key={text} className="flex space-x-5">
                    <div className="flex-shrink-0">
                      {negative ? (
                        <Minus className="h-6 w-6 text-gray-300" />
                      ) : (
                        <Check className="h-6 w-6 text-orange-500" />
                      )}
                    </div>
                    {footnote ? (
                      <div className="flex items-center space-x-1">
                        <p
                          className={cn("text-gray-600", {
                            "text-gray-400": negative,
                          })}
                        >
                          {text}
                        </p>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className="cursor-default ml-1.5">
                            <HelpCircle className="h-4 w-4 text-zinc-500" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80 p-2">
                            {footnote}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <p
                        className={cn("text-gray-600", {
                          "text-gray-400": negative,
                        })}
                      >
                        {text}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200" />
              <div className="p-5">
                {plan == "Free" ? (
                  <Link
                    href={user ? "/dashboard" : "/api/auth/login? "}
                    className={buttonVariants({
                      className: "w-full",
                      variant: "secondary",
                    })}
                  >
                    {user ? "Upgrade now" : "Sign up"}
                    <ArrowRight className="h-5 w-5 ml-1.5" />
                  </Link>
                ) : user ? (
                  <UpgradeButton />
                ) : (
                  <RegisterLink
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    {user ? "Upgrade now" : "Sign up"}
                    <ArrowRight className="h-5 w-5 ml-1.5" />
                  </RegisterLink>
                )}
              </div>
            </div>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default PriceTool;
