"use client";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

function Logo() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!containerRef.current) return;
    },
    { scope: containerRef, revertOnUpdate: true }
  );

  const handleMouseEnter = contextSafe(() => {
    const splittedText = new SplitText(textRef.current, {
      type: "chars, lines",
      mask: "lines",
    });

    const splittedText2 = new SplitText(text2Ref.current, {
      type: "chars, lines",
      mask: "lines",
    });
    const tl = gsap.timeline({});

    tl.to(splittedText.chars, {
      y: -50,
      duration: 0.5,
      stagger: 0.04,
    });

    tl.to(splittedText2.chars, {
      y: 0,
      duration: 0.5,
      stagger: 0.04,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!textRef.current) return;

    const splittedText = new SplitText(textRef.current, {
      type: "chars, lines",
      mask: "lines",
    });

    const splittedText2 = new SplitText(text2Ref.current, {
      type: "chars, lines",
      mask: "lines",
    });
    const tl = gsap.timeline({});

    tl.from(splittedText.chars, {
      y: -50,
      duration: 0.5,
      stagger: 0.04,
    });
  });

  return (
    <Link
      href="/"
      className="flex items-center whitespace-nowrap justify-center gap-2 uppercase bg-foreground px-2 pb-1 pt-2 text-white w-fit rounded-md"
      ref={containerRef}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="text-3xl font-bold font-obviously leading-none relative"
        style={{
          fontVariationSettings: '"wdth" 200',
        }}
      >
        <span ref={textRef}>MAMMOTH MURALS</span>
        <span
          ref={text2Ref}
          className="absolute inset-0 translate-y-10 text-red-500"
        >
          MAMMOTH MURALS
        </span>
      </div>
    </Link>
  );
}

export default Logo;
