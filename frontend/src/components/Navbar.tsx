import Link from "next/link";
import { ReactElement } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar(): ReactElement {
  return (
    <nav className="w-full border-b bg-slate-50/80 dark:bg-slate-900/95 px-6 py-3 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-slate-900 dark:text-slate-200"
        >
          EpiStock
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/docs"
                  className="text-slate-50"
                >
                  Documentation
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/materiel"
                  className="text-slate-50"
                >
                  Matériel
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-slate-700 text-white rounded-md shadow hover:bg-slate-800 transition font-semibold"
          >
            Connexion
          </Link>
        </div>
      </div>
    </nav>
  );
}
