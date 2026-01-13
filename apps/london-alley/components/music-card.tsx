import { SLIDE_ITEMS } from "@/lib/constants/slide";
import VideoWithFallback from "./video-with-fallback";
import { Env } from "@/configs/env";

export function MusicCard({ data }: { data: (typeof SLIDE_ITEMS)[number] }) {
  return (
    <div
      className="relative aspect-5/4 h-auto hover:p-4 2xl:hover:p-6 transition-all duration-300 group ease-[cubic-bezier(.17,.67,1,1.23)]"
      style={{
        background: data.dominantColor,
      }}
    >
      <VideoWithFallback
        src={`${Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL}${data.videoSrc}`}
        fallbackSrc={`${Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL}${data.cover}`}
        playOnHover
      />
      <div className="absolute bottom-4 left-4 2xl:bottom-6 2xl:left-6 text-white">
        <h3 className="uppercase text-sm 2xl:text-base font-light relative transition-[clip-path] duration-800 [clip-path:polygon(0_0,100%_0,100%_0,0_0)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
          {data.title}
        </h3>

        <h2 className="uppercase font-stretch-extra-expanded font-extrabold text-sm md:text-base 2xl:text-3xl transition-[clip-path] duration-800 [clip-path:polygon(0_0,100%_0,100%_0,0_0)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
          {data.artist}
        </h2>
      </div>
    </div>
  );
}
