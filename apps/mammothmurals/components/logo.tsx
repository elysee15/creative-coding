import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 uppercase bg-foreground px-2 pb-1.5 pt-2.5 text-white w-fit rounded-md"
    >
      <div
        className="text-4xl font-bold font-obviously leading-none"
        style={{
          fontVariationSettings: '"wdth" 200',
        }}
      >
        MAMMOTH MURALS
      </div>
    </Link>
  );
}

export default Logo;
