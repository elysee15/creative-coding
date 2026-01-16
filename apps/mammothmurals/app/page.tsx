import Header from "@/components/header";
import Logo from "@/components/logo";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <article className="bg-yellow min-h-screen pt-42 px-[2vw]">
        <section className="flex flex-col 2xl:gap-28 gap-16">
          <h1
            className="text-[clamp(2rem,10vw,11rem)] font-bold font-obviously flex flex-col gap-0 leading-[0.9]"
            style={{ fontVariationSettings: '"wdth" 200' }}
          >
            <span>MURALS THAT MAKE</span> <span>YOUR BUSINESS</span>
            <span>IMPOSSIBLE TO IGNORE.</span>
          </h1>
          <div className="space-y-6">
            <p className="max-w-2xl text-balance text-3xl font-semibold">
              We paint bold, hand-crafted walls for real estate developers, and
              design-driven brands that stop traffic, spark conversation, and
              turn every space into a landmark.
            </p>
            <div className="flex items-center gap-2">
              <Button
                className="uppercase font-semibold p-2 h-[46px]! bg-foreground"
                size="lg"
              >
                <Image
                  src="https://cdn.prod.website-files.com/6870db6428fa0046e4e9dc88/688995b78786bb6f8df3b6ef_1753282172963.avif"
                  alt="Chat with us"
                  width={30}
                  height={30}
                />
                BOOK A DISCOVERY CALL
              </Button>
              <Button
                className="uppercase font-semibold h-[46px]!"
                variant="outline"
                size="lg"
              >
                See our work
              </Button>
            </div>
          </div>
        </section>
        <section className="absolute bottom-8 right-[2vw] w-[clamp(200px,30vw,400px)] md:gap-4 gap-2 rounded-md overflow-hidden flex flex-col">
          <div className="relative aspect-video w-full h-full">
            <video
              src="https://player.vimeo.com/progressive_redirect/playback/1114117023/rendition/1080p/file.mp4?loc=external&signature=884e06f67cbd1a272570607a499f8a051b591e9ad6018a102f77200776865f9e"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </div>

          <p className="md:text-xl text-base font-semibold">
            Showreel (2023—2025)
          </p>
        </section>
      </article>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
      rerum obcaecati dolores corrupti temporibus odio unde, exercitationem
      magni autem dolor atque laborum asperiores ad sint nulla vel tempore sed,
      explicabo a? Quisquam, officia fugiat nihil possimus nobis nulla
      doloremque. Pariatur consequuntur iste minima possimus dolorum commodi
      quos ad sequi! Nemo animi ex vero architecto illum cum iste quod id facere
      exercitationem libero consectetur, beatae voluptas eos, reiciendis
      perferendis alias officia hic minus, ipsam corporis facilis magni. Minima
      odio, laboriosam consequuntur perspiciatis ut eum dolores omnis nemo
      perferendis quaerat sequi, non magni reprehenderit maiores voluptates
      placeat? Officiis harum provident, impedit, praesentium ab nulla dolor
      quaerat eligendi, numquam ut et suscipit consequatur! Molestias
      voluptatibus possimus saepe vel cupiditate explicabo neque. Alias ab
      facere cumque excepturi inventore unde dolorum nostrum repellendus quos
      vero optio commodi expedita odit officia, explicabo iusto deserunt sed nam
      error facilis quae necessitatibus vel ipsam repellat. Ea ut aspernatur hic
      totam sint amet at repellendus fugit ad, asperiores reprehenderit error
      porro corrupti aut excepturi voluptatum commodi eaque in. Illo minus modi
      molestias architecto facilis blanditiis accusantium dolor deleniti nisi
      nemo quia neque iure accusamus recusandae temporibus, exercitationem
      quisquam unde. Quos ad at minus tempora ullam illum eligendi neque fugit.
    </div>
  );
}
