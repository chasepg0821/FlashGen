"use client";

import React, { ReactElement } from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navOptions = [
    {
        label: "Basic",
        route: "/"
    },
    {
        label: "Similarity",
        route: "/similarity"
    },
    {
        label: "AI",
        route: "/ai"
    }
];

const renderNavOptions = (pathname: string) => {
    return (
        <>
            {navOptions.map((option) => {
                let classname = styles.link;
                if (pathname === option.route) {
                    classname += ` ${styles.selected}`;
                }

                return (
                    <Link
                        className={classname}
                        href={option.route}
                        key={option.label}
                        style={{
                            height: `calc(100vh / ${navOptions.length} - ${
                                10 * navOptions.length
                            }px)`
                        }}>
                        {option.label}
                    </Link>
                );
            })}
        </>
    );
};

const SideBar = () => {
    const path = usePathname();

    return <nav className={styles.nav}>{renderNavOptions(path)}</nav>;
};

export default SideBar;
