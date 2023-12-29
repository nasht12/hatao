import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "./ui/input";
import { ComponentBooleanIcon } from "@radix-ui/react-icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* <MainNav />
        <MobileNav /> */}
        <Link href={"/"}>
          <div className="flex items-center">
            <div className="flex items-center m-1 text-xl font-semibold bg-gradient-to-r from-slate-900 to-green-700 bg-clip-text text-transparent">
              Ranque
            </div>
            <ComponentBooleanIcon />
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-between mx-2 space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                className="sm: w-[100] md:w-[100px] lg:w-[240px]"
              />
            </div>
          </div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
