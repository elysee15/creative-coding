/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useInView } from "react-intersection-observer";

type VideoWithFallbackProps = {
  src: string;
  fallbackSrc: string;
  fallbackClassName?: string;
  playOnHover?: boolean;
  priority?: boolean;
};

function VideoWithFallback({
  src,
  fallbackSrc,
  fallbackClassName,
  playOnHover = false,
  priority = false,
}: VideoWithFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const isMobile = useMobile();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const normalizedPlayOnHover = Boolean(playOnHover);
  const normalizedIsMobile = Boolean(isMobile);

  useEffect(() => {
    if (videoRef.current && inView) {
      videoRef.current.load();
    }
  }, [inView]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setCanPlay(true);

      if (isMobile || !playOnHover) {
        if (inView) {
          video.play().catch(() => {});
        }
      } else {
        video.pause();
      }
    };

    video.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, [src, normalizedPlayOnHover, normalizedIsMobile, inView]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !isMobile) return;

    if (canPlay) {
      video.play().catch(() => {});
    } else if (!inView) {
      video.pause();
    }
  }, [inView, canPlay, normalizedIsMobile]);

  const handleMouseEnter = () => {
    if (!isMobile && playOnHover && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("video play failed", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && playOnHover && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-video size-full"
      ref={ref}
    >
      <span className="absolute inset-0 bg-black/30 z-1"></span>
      <video
        ref={videoRef}
        src={src}
        muted
        preload="none"
        autoPlay={isMobile || !playOnHover}
        playsInline
        loop
        className={cn("object-cover size-full absolute inset-0", {
          "opacity-0": !canPlay,
        })}
      />
      <Image
        src={fallbackSrc}
        alt=""
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        loading={priority ? "eager" : undefined}
        className={cn(
          "object-cover opacity-100 transition-opacity duration-200",
          {
            "group-hover:opacity-0": canPlay && !isMobile,
            "opacity-0": canPlay && isMobile,
          },
          fallbackClassName
        )}
      />
    </div>
  );
}

export default VideoWithFallback;
