import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PriceTool from "@/components/priceTool";
import { constructMetadata } from '@/lib/utils';

export const metadata = constructMetadata({
  title: "Custom Title",
  description: "Custom Description",
  image: "/custom-thumbnail.png",
  icons: "/custom-favicon.ico",
  noIndex: true
})
const Page = async () => {
  

  return (
    <>
      <MaxWidthWrapper calssName='mb-8 mt-24 text-center max-w-6xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>
            Pricing
          </h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Whether you&apos;re just trying out our service
            or need more, we&apos;ve got you covered.
          </p>
        </div>
        <PriceTool/>
      </MaxWidthWrapper>
    </>
  )
}

export default Page