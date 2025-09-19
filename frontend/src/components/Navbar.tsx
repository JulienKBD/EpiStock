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

export default function Navbar(): ReactElement {
  return (
    <nav className="w-full border-b bg-slate-50/80 dark:bg-slate-900/95 px-6 py-3 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-slate-900 dark:text-slate-200"
        >
          EpiStock
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/docs"
                    className="text-slate-900 dark:text-slate-50 hover:text-slate-500 dark:hover:text-slate-400"
                  >
                    Documentation
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/materials"
                    className="text-slate-900 dark:text-slate-50 hover:text-slate-500 dark:hover:text-slate-400"
                  >
                    Matériel
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/dashboard"
                    className="text-slate-900 dark:text-slate-50 hover:text-slate-500 dark:hover:text-slate-400"
                  >
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Connexion button (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-slate-700 text-white rounded-md shadow hover:bg-slate-600 transition font-semibold"
          >
            Connexion
          </Link>
        </div>

        {/* Hamburger menu (mobile only) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800">
                <Menu className="h-6 w-6 text-slate-900 dark:text-slate-200" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-slate-50 dark:bg-slate-900 p-6">
              <SheetClose asChild>
                <button className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800">
                  <X className="h-6 w-6 text-slate-900 dark:text-slate-200" />
                </button>
              </SheetClose>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/docs"
                  className="text-slate-900 dark:text-slate-50 hover:underline"
                >
                  Documentation
                </Link>
                <Link
                  href="/materials"
                  className="text-slate-900 dark:text-slate-50 hover:underline"
                >
                  Matériel
                </Link>
                <Link
                  href="/dashboard"
                  className="text-slate-900 dark:text-slate-50 hover:underline"
                >
                  Dashboard
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-slate-700 text-white rounded-md shadow hover:bg-slate-600 transition font-semibold mt-4 text-center"
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
