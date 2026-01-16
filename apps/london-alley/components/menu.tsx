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
import React from "react";
import VideoWithFallback from "./video-with-fallback";
import ScrambleText from "./scramble-text";

function Menu() {
  return (
    <Drawer direction="top">
      <DrawerTrigger className="font-light uppercase hover:text-gold  relative group">
        <span className="absolute inline-block w-full h-px bg-gold -top-2 opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-250 ease-in-out"></span>
        MENU
      </DrawerTrigger>
      <DrawerContent className="px-5 md:px-10 pt-16 pb-5 md:pt-20 md:pb-10 max-h-fit! overflow-auto bg-white">
        <article className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          <section className="order-0">
            <h2 className="uppercase mb-1.5 md:mb-3 text-[#707070] font-light text-xs md:text-base">
              Directory
            </h2>
            <nav>
              <ul className="transition-all duration-500 text-xl sm:text-2xl md:text-3xl lg:text-5xl space-y-1.5 font-extrabold font-stretch-extra-expanded grid grid-cols-2 md:grid-cols-1 gap-x-2">
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
            <ul className="flex flex-wrap h-full justify-between gap-y-1 gap-x-5 text-sm lg:text-base columns-2 md:grid md:grid-cols-2">
              {SOCIAL_NETWORKS.map((item) => (
                <li
                  key={item.title}
                  className="hover:text-gold uppercase text-[#707070] font-light text-xs md:text-sm"
                >
                  <Link href={item.url} className="hover:text-gold">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-5">
              <h2 className="uppercase text-[#707070] font-light text-xs md:text-sm">
                Newsletter Sign Up
              </h2>
              <p className="leading-none text-xs md:text-sm">
                Be the first to know. <br /> Subscribe to our newsletter.
              </p>
              <form>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  className="placeholder:text-[#707070] border-b border-black w-full py-2 outline-none text-sm 2xl:text-base"
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
              ></VideoWithFallback>
              <Link
                href="/"
                className="bg-black/50 absolute inset-0 flex items-center justify-center"
              >
                <span className="group-hover:opacity-100 opacity-0 transition-all duration-500 text-white group-hover:text-gold">
                  Play reel
                </span>
              </Link>
            </div>
          </section>
        </article>
        <DrawerClose className="absolute top-4 right-4" asChild>
          <button className="cursor-pointer">CLOSE</button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

export default Menu;
