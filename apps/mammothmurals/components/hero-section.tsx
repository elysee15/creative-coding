import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";
import HeroVideo from "./hero-video";

function HeroSection({ className }: { className?: string }) {
  return (
    <article className={cn("container space-y-24", className)}>
      <div className="flex">
        <section className="flex flex-col 2xl:gap-28 gap-16 grow">
          <h1
            className="text-[clamp(2rem,10vw,11rem)] font-bold font-obviously flex flex-col gap-0 leading-[0.9]"
            style={{ fontVariationSettings: '"wdth" 200' }}
          >
            <span>MURALS THAT MAKE</span> <span>YOUR BUSINESS</span>
            <span>IMPOSSIBLE TO IGNORE.</span>
          </h1>
          <div className="space-y-6">
            <p className="max-w-2xl text-balance text-2xl font-semibold">
              We paint bold, hand-crafted walls for real estate developers, and
              design-driven brands that stop traffic, spark conversation, and
              turn every space into a landmark.
            </p>
            <div className="flex items-center gap-2">
              <Button
                className="uppercase font-semibold p-2 h-[46px]! bg-foreground text-white"
                size="lg"
              >
                <Image
                  src="https://cdn.prod.website-files.com/6870db6428fa0046e4e9dc88/688995b78786bb6f8df3b6ef_1753282172963.avif"
                  alt="Chat with us"
                  width={30}
                  height={30}
                />
                BOOK A DISCOVERY CALL
              </Button>
              <Button
                className="uppercase font-semibold h-[46px]!"
                variant="outline"
                size="lg"
              >
                See our work
              </Button>
            </div>
          </div>
        </section>
        <div className="w-[clamp(200px,30vw,400px)] self-end">
          <HeroVideo />
        </div>
      </div>
      <section className="relative h-[700px] aspect-video w-full">
        <Image
          src="https://cdn.prod.website-files.com/6870db6428fa0046e4e9dc88/68820f0ab20497c5cbd8c39f_BlueSushiBham-4%201.avif"
          alt="Hero section"
          fill
          className="object-cover size-full rounded-md"
        />
      </section>
      {/* <PartnersSection /> */}
    </article>
  );
}

export default HeroSection;
