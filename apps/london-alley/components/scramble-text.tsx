"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

function ScrambleText({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.to(containerRef.current, {
        duration: 1,
      });
    },
    { scope: containerRef, revertOnUpdate: true }
  );

  const handleMouseEnter = contextSafe(() => {
    if (!containerRef.current) return;

    if (tweenRef.current) {
      tweenRef.current.revert();
    }

    const tween = gsap.to(containerRef.current, {
      scrambleText: {
        text: text,
        chars: text,
      },
      duration: 1,
    });

    tweenRef.current = tween;
  });

  const handleMouseLeave = contextSafe(() => {
    if (tweenRef.current) {
      tweenRef.current.revert();
    }
  });

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </span>
  );
}

export default ScrambleText;
