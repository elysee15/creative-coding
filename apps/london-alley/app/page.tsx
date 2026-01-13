import { MusicCard } from "@/components/music-card";
import Slide from "@/components/slide";
import { Env } from "@/configs/env";
import { SLIDE_ITEMS } from "@/lib/constants/slide";
import { getDominantColor } from "@/lib/get-dominant-color";

export default async function Page() {
  const itemsWithDominantColors = await Promise.all(
    SLIDE_ITEMS.map(async (item) => {
      return {
        ...item,
        dominantColor:
          (await getDominantColor(
            `${Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL}${item.cover}`
          )) || "#000",
      };
    })
  );

  return (
    <main>
      <div className="fixed top-0 w-full">
        <Slide />
      </div>
      <article className="z-1 relative mt-[100vh] md:columns-2 gap-1 bg-[#1a1a1a] p-1">
        {itemsWithDominantColors.map((item, index) => (
          <MusicCard key={`music-card-${item.title}-${index}`} data={item} />
        ))}
      </article>
    </main>
  );
}
