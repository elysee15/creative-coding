"use client";

import { Env } from "@/configs/env";
import { MENU_ITEMS, SOCIAL_NETWORKS } from "@/lib/constants/menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@workspace/ui/components/drawer";
import Link from "next/link";
import React, { useEffect } from "react";
import VideoWithFallback from "./video-with-fallback";
import ScrambleText from "./scramble-text";

function Menu() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.addEventListener("canplay", () => {
      videoRef.current?.play();
    });
  }, []);

  return (
    <Drawer direction="top">
      <DrawerTrigger className="font-light uppercase hover:text-gold">
        MENU
      </DrawerTrigger>
      <DrawerContent className="px-10 pt-16 pb-5 md:pt-20 md:pb-10 max-h-fit! overflow-auto">
        <article className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          <section className="order-0">
            <h2 className="uppercase mb-3 text-[#707070] font-light text-sm md:text-base">
              Directory
            </h2>
            <nav>
              <ul className="transition-all duration-500 text-2xl md:text-3xl lg:text-5xl space-y-1.5 font-extrabold font-stretch-extra-expanded">
                {MENU_ITEMS.map((item) => (
                  <li key={item.title} className="hover:text-gold">
                    <Link href={item.url}>
                      <ScrambleText text={item.title} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <section className="flex flex-col-reverse md:flex-col justify-between h-full pt-4 gap-6 md:gap-y-3">
            <ul className="grid grid-cols-4 md:grid-cols-2 gap-5 text-sm lg:text-base">
              {SOCIAL_NETWORKS.map((item) => (
                <li
                  key={item.title}
                  className="hover:text-gold uppercase text-[#707070] font-light text-sm"
                >
                  <Link href={item.url} className="hover:text-gold">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-5">
              <h2 className="uppercase text-[#707070] font-light">
                Newsletter Sign Up
              </h2>
              <p className="leading-none text-sm">
                Be the first to know. <br /> Subscribe to our newsletter.
              </p>
              <form>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  className="placeholder:text-[#707070] border-b border-black w-full py-2 outline-none"
                />
              </form>
            </div>
          </section>
          <section className="grid gap-10 -order-1 md:order-0">
            <div className="relative rounded-4xl overflow-hidden group">
              <VideoWithFallback
                src={Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL + "/babilab.mp4"}
                fallbackSrc={
                  Env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL + "/babilab.png"
                }
                muted
                preload="metadata"
                autoPlay
                ref={videoRef}
              ></VideoWithFallback>
              <Link
                href="/"
                className="bg-black/10 absolute inset-0 flex items-center justify-center"
              >
                <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-500 text-white">
                  Play reel
                </span>
              </Link>
            </div>
          </section>
        </article>
        <DrawerClose className="absolute top-4 right-4">
          <button className="cursor-pointer">CLOSE</button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

export default Menu;
