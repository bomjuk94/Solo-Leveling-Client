import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@/constants/navLinks";

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `transition-colors ${isActive
                                ? "text-[var(--accent-blue)] font-semibold"
                                : "text-[var(--text-muted)] hover:text-[var(--accent-blue)]"
                            }`
                        }
                    >
                        {/* Text only on desktop */}
                        {link.name}
                    </NavLink>
                ))}
            </nav>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-[var(--text-primary)] focus:outline-none cursor-pointer"
                >
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="absolute top-16 right-4 bg-[var(--bg-dialog)] border border-[var(--border)] rounded-lg shadow-lg w-48 p-4 flex flex-col space-y-4 z-50">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 transition-colors ${isActive
                                        ? "text-[var(--accent-blue)] font-semibold"
                                        : "text-[var(--text-muted)] hover:text-[var(--accent-blue)]"
                                    }`
                                }
                            >
                                {/* Icon + text on mobile */}
                                {link.icon}
                                <span>{link.name}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Nav;
