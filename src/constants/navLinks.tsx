import { type ReactNode } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBullseye, FaHistory, FaStore } from "react-icons/fa";
import { RiLoginCircleFill, RiUserAddFill } from "react-icons/ri";

export type NavLinkItem = {
    path: string
    name: string
    icon: ReactNode
};

export const navLinks: NavLinkItem[] = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <MdSpaceDashboard className="w-5 h-5 text-[var(--accent-blue)]" />,
    },
    {
        path: "/set-goals",
        name: "Set Goals",
        icon: <FaBullseye className="w-5 h-5 text-[var(--accent-purple)]" />,
    },
    {
        path: "/history",
        name: "History",
        icon: <FaHistory className="w-5 h-5 text-[var(--accent-gold)]" />,
    },
    {
        path: "/store",
        name: "Store",
        icon: <FaStore className="w-5 h-5 text-[var(--accent-green)]" />,
    },
    {
        path: "/login",
        name: "Login",
        icon: <RiLoginCircleFill className="w-5 h-5 text-[var(--accent-blue)]" />,
    },
    {
        path: "/register",
        name: "Register",
        icon: <RiUserAddFill className="w-5 h-5 text-[var(--accent-purple)]" />,
    },
];
