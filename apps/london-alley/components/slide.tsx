import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { SLIDE_ITEMS } from "@/lib/constants/slide";
import SlideMenu from "./slide-menu";

const prefix = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL;

function Slide() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const videoRefs = React.useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    if (!api) return;

    // Set initial value
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());

      videoRefs.current.forEach((video, index) => {
        if (index === api.selectedScrollSnap()) {
          video.play();
        } else {
          video.currentTime = 0;
          video.pause();
        }
      });
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const isCurrent = (index: number) => index === current;

  const handleMouseEnter = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    api?.scrollTo(index);
    api?.plugins()?.autoplay?.stop();
  };

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          duration: 20,
        }}
        plugins={[Autoplay(), Fade()]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="min-h-screen">
          {SLIDE_ITEMS.map((item, index) => (
            <CarouselItem key={index} className="basis-1/1 relative inset-0">
              <figure className="size-full absolute inset-0">
                <video
                  src={`${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL}${item.videoSrc}`}
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  preload="metadata"
                  loop
                  ref={(video) => (videoRefs.current[index] = video!) as any}
                  autoPlay={index === current}
                  poster={`${prefix}${item.cover}`}
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 flex flex-col justify-end items-end pb-10 pr-4 z-3 bg-black/50">
        <SlideMenu
          items={SLIDE_ITEMS}
          onMouseEnter={handleMouseEnter}
          isCurrentSlide={isCurrent}
        />
      </div>
    </div>
  );
}

export default Slide;
