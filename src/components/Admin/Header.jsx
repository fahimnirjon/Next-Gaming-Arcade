import Image from "next/image";
import { signOut } from "@/app/auth";

export default function Header() {
  return (
    <header className="px-4 flex h-14 shrink-0 items-center gap-4 justify-between">
      <a href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="TheNextGameStation"
          width={116.56}
          height={33.8}
          loading="eager"
        />
      </a>

      <nav className="flex gap-4 md:gap-6">

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>

        <a href="/">Vist Main Site &#8599;</a>
      </nav>
    </header>
  );
}
