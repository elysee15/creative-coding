"use client";

import Slide from "@/components/slide";
import VideoWithFallback from "@/components/video-with-fallback";
import { Env } from "@/configs/env";
import { SLIDE_ITEMS } from "@/lib/constants/slide";

export default function Page() {
  return (
    <div>
      <div className="fixed top-0 w-full">
        <Slide />
      </div>
      <article className="z-1 relative mt-[100vh] md:columns-2 gap-1 bg-[#1a1a1a] p-1">
        {SLIDE_ITEMS.map((item, index) => (
          <MusicCard key={index} data={item} />
        ))}
      </article>
    </div>
  );
}

function MusicCard({ data }: { data: (typeof SLIDE_ITEMS)[number] }) {
  return (
    <div className="relative aspect-5/4 h-auto hover:p-4 transition-all duration-300 group ease-[cubic-bezier(.17,.67,1,1.23)]">
      <VideoWithFallback
        src={`${Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL}${data.videoSrc}`}
        fallbackSrc={`${Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL}${data.cover}`}
        playOnHover
      />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="uppercase text-sm font-light">{data.title}</h3>
        <h2 className="uppercase font-stretch-extra-expanded font-extrabold text-sm md:text-base">
          {data.artist}
        </h2>
      </div>
    </div>
  );
}
