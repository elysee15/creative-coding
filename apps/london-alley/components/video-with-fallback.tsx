"use client";

import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";

type VideoWithFallbackProps = {
  src: string;
  fallbackSrc: string;
} & React.ComponentProps<"video">;

function VideoWithFallback({
  src,
  fallbackSrc,
  ref,
  ...videoProps
}: VideoWithFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);

  const [canPlay, setCanPlay] = useState(false);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.oncanplay = () => {
        console.log("canplay");
        setCanPlay(true);
        videoRef.current?.play();
      };
    }
  }, [src]);

  return (
    <div className="relative aspect-video size-full">
      <video
        src={src}
        muted
        preload="metadata"
        autoPlay
        {...videoProps}
        className={cn("object-cover size-full absolute inset-0", {
          "opacity-0": !canPlay,
        })}
        ref={videoRef}
      ></video>
      <Image
        src={fallbackSrc}
        alt=""
        ref={fallbackRef}
        priority
        fill
        className={cn(
          "object-cover opacity-100 transition-opacity duration-200",
          {
            "opacity-0": canPlay,
          }
        )}
      />
    </div>
  );
}

export default VideoWithFallback;
