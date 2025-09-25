import Link from "next/link";
import { ReactElement } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

export default function Navbar(): ReactElement {
  return (
    <nav className="w-full sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + titre */}
        <Link
          href="/"
          className="ml-2 text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2"
        >
          <div className="relative w-8 h-8 md:w-9 md:h-9 flex-shrink-0">
            <Image
              src="/favicon.ico"
              alt="EpiStock Logo"
              className="object-contain"
              width={128}
              height={128}
            />
          </div>
          <span className="tracking-tight">EpiStock</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/docs"
                    className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-medium"
                  >
                    Documentation
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/materiel"
                    className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-medium"
                  >
                    Matériel
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/dashboard"
                    className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/wishlist"
                    className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-medium"
                  >
                    Liste de souhaits
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Connexion button (desktop only) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/login"
            className="px-3 py-1.5 bg-slate-800 text-white rounded-md shadow-sm hover:bg-slate-700 transition text-sm font-medium"
          >
            Connexion
          </Link>
        </div>

        {/* Hamburger menu (mobile only) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800/70">
                <Menu className="h-5 w-5 text-slate-900 dark:text-slate-200" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-slate-50 dark:bg-slate-900 p-5">
              <SheetClose asChild>
                <button className="absolute top-3 right-3 p-2 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800/70">
                  <X className="h-5 w-5 text-slate-900 dark:text-slate-200" />
                </button>
              </SheetClose>

              <DialogTitle className="sr-only">Menu principal</DialogTitle>
              <DialogDescription className="sr-only">
                Ce menu vous permet de naviguer vers la documentation, le matériel, le dashboard et de vous connecter.
              </DialogDescription>

        <nav className="flex flex-col space-y-3 mt-6">
                <Link href="/docs" className="text-slate-900 dark:text-slate-50 hover:underline">
                  Documentation
                </Link>
                <Link href="/materiel" className="text-slate-900 dark:text-slate-50 hover:underline">
                  Matériel
                </Link>
                <Link href="/dashboard" className="text-slate-900 dark:text-slate-50 hover:underline">
                  Dashboard
                </Link>
                <Link href="/wishlist" className="text-slate-900 dark:text-slate-50 hover:underline">
                  Liste de souhaits
                </Link>
                <Link
                  href="/login"
          className="px-3 py-1.5 bg-slate-800 text-white rounded-md shadow-sm hover:bg-slate-700 transition text-sm font-medium mt-4 text-center"
                >
                  Connexion
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
