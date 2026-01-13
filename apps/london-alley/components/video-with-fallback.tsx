"use client";

import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";

type VideoWithFallbackProps = {
  src: string;
  fallbackSrc: string;
  fallbackClassName?: string;
  playOnHover?: boolean;
};

function VideoWithFallback({
  src,
  fallbackSrc,
  fallbackClassName,
  playOnHover = false,
}: VideoWithFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const isMobile = useMobile();

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setCanPlay(true);

      // On mobile, always autoplay (ignore playOnHover)
      // On desktop, respect playOnHover setting
      if (isMobile || !playOnHover) {
        video.play().catch(() => {
          // Autoplay failed, likely due to browser policies
        });
      } else {
        video.pause();
      }
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [src, playOnHover, isMobile]);

  const handleMouseEnter = () => {
    // Only handle hover on non-mobile devices
    if (!isMobile && playOnHover && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    // Only handle hover on non-mobile devices
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
    >
      <video
        ref={videoRef}
        src={src}
        muted
        preload="metadata"
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
        priority
        fill
        className={cn(
          "object-cover opacity-100 transition-opacity duration-200",
          {
            "group-hover:opacity-0": canPlay && !isMobile,
          },
          fallbackClassName
        )}
      />
    </div>
  );
}

export default VideoWithFallback;
