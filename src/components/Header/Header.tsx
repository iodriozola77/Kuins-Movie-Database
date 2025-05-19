"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const pages = [
    {href: "/popular", label: "Popular Movies"},
    {href: "/top-rated", label: "Top Rated"},
    {href: "/now-playing", label: "Now Playing"},
    {href: "/my-favorites", label: "My Favorites"}
];

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="w-full bg-black">
            <div className="flex h-28 items-center justify-between bg-black">
                <Link href={"/"} className="text-white text-center pl-6"
                style={{ fontFamily: "var(--font-codystar)", fontSize:"xxx-large"}}>
                    Kuin&apos;s Movie Database
                </Link>

                <nav className="flex pr-6">
                    {pages.map(({href, label}) => (
                        <Link key={href} href={href} className={clsx(pathname===href? "text-emerald-500":"text-white", "mr-3")}>
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;