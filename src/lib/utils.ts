import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.URL)
    return `https://${process.env.URL}${path}`
  return `http://localhost:${
    process.env.PORT ?? 3000
  }${path}`
}

export function constructMetadata(
  pageType: string,
  {
    title = "PDF To Chat - Chat with your PDF",
    description = "PDF To Chat is a software that helps you chat with your PDF documents.",
    image = "/thumbnail.png",
    icons = "/favicon.ico",
    noIndex = false
  }: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
  } = {}
): Metadata {
  
  if (pageType === "home") {
    title = "PDF To Chat - Chat with your PDF";
  } else if (pageType === "pricing") {
    title = "PDF To Chat - Pricing";
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Rani_Shwaiki"
    },
    icons,
    metadataBase: new URL('https://PDFTo.chat'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };
}