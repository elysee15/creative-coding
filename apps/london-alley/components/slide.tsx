"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import { SLIDE_ITEMS } from "@/lib/constants/slide";
import SlideMenuDesktop from "./slide-menu-desktop";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";
import { useInView } from "react-intersection-observer";

const CLOUDFLARE_PREFIX = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL;
const CAROUSEL_DURATION = 20;

function Slide() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const stopAutoplay = useCallback(() => {
    api?.plugins()?.autoplay?.stop();
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap());

    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrentSlide(selected);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const handleSlideHover = useCallback(
    (_event: React.MouseEvent<HTMLDivElement>, index: number) => {
      if (!api) return;

      api.scrollTo(index);
      stopAutoplay();
    },
    [api, stopAutoplay]
  );

  const navigateSlide = useCallback(
    (direction: "next" | "prev") => {
      if (!api) return;

      const canNavigate =
        direction === "next" ? api.canScrollNext() : api.canScrollPrev();

      if (!canNavigate) return;

      if (direction === "next") {
        api.scrollNext();
      } else {
        api.scrollPrev();
      }

      stopAutoplay();
    },
    [api, stopAutoplay]
  );

  const isCurrentSlide = useCallback(
    (index: number) => index === currentSlide,
    [currentSlide]
  );

  const totalSlides = api?.slideNodes().length ?? SLIDE_ITEMS.length;

  return (
    <div className="relative">
      <Carousel
        opts={{ duration: CAROUSEL_DURATION, loop: true }}
        plugins={[Autoplay(), Fade()]}
        setApi={setApi}
      >
        <CarouselContent className="min-h-dvh ml-0">
          {SLIDE_ITEMS.map((item, index) => (
            <CarouselItem key={index} className="relative inset-0">
              <SlideVideo
                item={item}
                index={index}
                isCurrentSlide={index === currentSlide}
                isActive={index === currentSlide}
              />

              <div className="absolute inset-0 bg-black/40" />

              <MobileSlideControls
                item={item}
                currentIndex={index}
                totalSlides={totalSlides}
                onNext={() => navigateSlide("next")}
                onPrev={() => navigateSlide("prev")}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <DesktopSlideMenu
        items={SLIDE_ITEMS}
        onMouseEnter={handleSlideHover}
        isCurrentSlide={isCurrentSlide}
      />
    </div>
  );
}

interface SlideVideoProps {
  item: (typeof SLIDE_ITEMS)[number];
  index: number;
  isActive: boolean;
  videoRef?: (el: HTMLVideoElement) => void;
  isCurrentSlide: boolean;
}

function SlideVideo({ item, isCurrentSlide }: SlideVideoProps) {
  const videoInnerRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    const video = videoInnerRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setCanPlay(true);
    };

    video.addEventListener("canplaythrough", handleCanPlay);

    if (isCurrentSlide) {
      setCanPlay(false);

      if (video.readyState >= 3) {
        setCanPlay(true);
        video.play().catch((err) => {
          console.error("Video play failed:", err);
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setCanPlay(false);
    }

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, [isCurrentSlide]);

  return (
    <figure className="size-full absolute inset-0" ref={ref}>
      <video
        src={`${CLOUDFLARE_PREFIX}${item.videoSrc}`}
        playsInline
        muted
        loop
        preload="metadata"
        poster={`${CLOUDFLARE_PREFIX}${item.cover}`}
        className={cn(
          "size-full object-cover transition-opacity duration-300",
          {
            "opacity-0": !canPlay,
          }
        )}
        ref={videoInnerRef}
      />
      <Image
        src={`${CLOUDFLARE_PREFIX}${item.cover}`}
        alt={item.title}
        className={cn(
          "size-full object-cover transition-opacity duration-300",
          {
            "opacity-0": canPlay,
          }
        )}
        fill={true}
      />
    </figure>
  );
}

interface MobileSlideControlsProps {
  item: (typeof SLIDE_ITEMS)[number];
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

function MobileSlideControls({
  item,
  currentIndex,
  totalSlides,
  onNext,
  onPrev,
}: MobileSlideControlsProps) {
  return (
    <section className="absolute bottom-10 left-0 right-0 text-center items-end px-4 text-white z-10 flex lg:hidden justify-between">
      <button onClick={onPrev} aria-label="Previous slide">
        <span className="sr-only">Previous slide</span>
        <ChevronLeft />
      </button>

      <Link href="/#" className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-stretch-extra-expanded font-extrabold text-ellipsis">
            {item.title}
          </h2>
          <p className="uppercase font-light text-sm">{item.artist}</p>
        </div>
        <p className="font-light text-xs">
          {currentIndex + 1} / {totalSlides}
        </p>
      </Link>

      <button onClick={onNext} aria-label="Next slide">
        <span className="sr-only">Next slide</span>
        <ChevronRight />
      </button>
    </section>
  );
}

interface DesktopSlideMenuProps {
  items: typeof SLIDE_ITEMS;
  onMouseEnter: (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => void;
  isCurrentSlide: (index: number) => boolean;
}

function DesktopSlideMenu({
  items,
  onMouseEnter,
  isCurrentSlide,
}: DesktopSlideMenuProps) {
  return (
    <div className="absolute inset-0 flex-col justify-end items-end pb-10 pr-4 z-3 hidden lg:flex">
      <SlideMenuDesktop
        items={items}
        onMouseEnter={onMouseEnter}
        isCurrentSlide={isCurrentSlide}
      />
    </div>
  );
}

export default Slide;
