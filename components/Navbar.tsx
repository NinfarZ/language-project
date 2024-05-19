"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { MenuIcon } from "./icons/menu-icon";

export default function Navbar() {
	return (
		<nav className="border-b-black w-full p-4 flex flex-row justify-between sticky top-0 shadow-sm">
			<h1 className="text-2xl">
				CON<b className="text-primary">_text</b>UALIZE
			</h1>

			<div className="md:hidden ">
				<button>
					<div className="w-10 h-10">
						<MenuIcon />
					</div>
					
				</button>
				
			</div>
			<div className="hidden md:flex gap-4">
				<MenuButtons />
			</div>
		</nav>
	);
}

const MenuButtons = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>WORDS</NavigationMenuTrigger>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>SENTENCES</NavigationMenuTrigger>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							LOGIN
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
