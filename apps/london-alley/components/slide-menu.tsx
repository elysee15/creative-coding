import { SLIDE_ITEMS } from "@/lib/constants/slide";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import React from "react";

type SlideMenuProps = {
  items: typeof SLIDE_ITEMS;
  onMouseEnter: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
  isCurrentSlide: (index: number) => boolean;
};

function SlideMenu({ items, onMouseEnter, isCurrentSlide }: SlideMenuProps) {
  const artistRefs = React.useRef<HTMLSpanElement[]>([]);
  const [artistWidths, setArtistWidths] = React.useState<string[]>([]);

  React.useLayoutEffect(() => {
    const widths = artistRefs.current.map((artist) =>
      artist ? `${artist.offsetWidth}px` : "0px"
    );
    setArtistWidths(widths);
  }, [items]);

  // const getArtistWidth = (index: number): `${number}px` => {
  //   const artist = artistRefs.current[index];
  //   return artist ? `${artist.offsetWidth}px` : `0px`;
  // };

  return (
    <article className="flex flex-col gap-y-2">
      {items.map((item, index) => (
        <Link
          href={item.title}
          key={`${item.title}-${index}`}
          className="overflow-hidden relative"
          style={{
            "--width": artistWidths[index] || "0px",
          }}
        >
          <div
            key={item.title + index}
            onMouseEnter={(event) => onMouseEnter(event, index)}
            className={cn(
              "text-white text-end hover:text-gold duration-250 uppercase translate-x-(--width) hover:translate-x-0",
              {
                "text-gold translate-x-0": isCurrentSlide(index),
              }
            )}
          >
            <span
              className={cn(
                "text-xl font-extrabold tracking-tight transition-[font-variation-settings] duration-250 ease-[cubic-bezier(0.42, 0, 0.58, 1)]"
              )}
              style={{
                fontVariationSettings: isCurrentSlide(index)
                  ? "'wdth' 150,'wght' 900"
                  : "'wdth' 110,'wght' 800",
              }}
            >
              {item.title}
            </span>{" "}
            <span
              ref={(el) => (artistRefs.current[index] = el!) as any}
              className="text-sm font-light inline-block relative"
            >
              {item.artist}
            </span>
          </div>
        </Link>
      ))}
    </article>
  );
}

export default SlideMenu;

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
