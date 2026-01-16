import Link from "next/link";
import Logo from "./logo";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";

const NAV_ITEMS = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
];

function Header() {
  return (
    <header className="flex items-center justify-between px-[2vw] mx-auto fixed w-full top-10 z-10">
      <Logo />

      <nav>
        <ul className="flex items-center gap-4 uppercase text-foreground font-semibold">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="border border-foreground p-4 hover:bg-foreground hover:text-white transition-all duration-200 text-sm rounded-md flex items-center justify-center"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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
        Chat with us
      </Button>
    </header>
  );
}

export default Header;
