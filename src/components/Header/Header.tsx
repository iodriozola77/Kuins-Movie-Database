"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const pages = [
    {href: "/popular", label: "Popular Movies"},
    {href: "/top-rated", label: "Top Rated"},
    {href: "/now-playing", label: "Now Playing"},
    {href: "/my-favorites", label: "My Favorites"}
];

const Header = () => {
    const pathname = usePathname();

    const isMobile = useMediaQuery({ maxWidth: 500 });

    if(isMobile) {
        return (
            <header className="w-full bg-black pb-3">
                <div className="h-28 items-center justify-between bg-black pb-5">
                    <Link href={"/"} className="text-white text-center pl-6 flex items-center pt-3"
                    style={{ fontFamily: "var(--font-codystar)", fontSize:"1.5rem"}}>
                        <Image src="/favicon.ico" alt="Logo" width={40} height={40} className="pr-6 w-[8vh] h-auto"></Image>
                        Kuin&apos;s Movie Database
                    </Link>

                    <nav className="flex text-xs justify-between items-center pt-5 px-5">
                        {pages.map(({href, label}) => (
                            <Link key={href} href={href} className={clsx(pathname===href? "text-emerald-500":"text-white", "mr-3")}>
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="pb-3"></div>
            </header>
        );
    }

    return (
        <header className="w-full bg-black">
            <div className="flex h-28 items-center justify-between bg-black">
                <Link href={"/"} className="text-white text-center pl-6 flex items-center"
                style={{ fontFamily: "var(--font-codystar)", fontSize:"1.75rem"}}>
                    <Image src="/favicon.ico" alt="Logo" width={40} height={40} className="pr-6 w-[10vh] h-auto"></Image>
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