import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
    return (
        <header className="w-full bg-[var(--bg-dialog)] border-b border-[var(--border)] shadow-sm">
            <div className="max-w-[var(--spacing-desktop-width)] mx-auto flex items-center justify-between px-6 py-4">

                {/* Brand / Logo */}
                <Link
                    to={'/'}
                >
                    <h1 className="text-xl font-bold text-[var(--text-primary)] font-serif">
                        Solo Leveling
                    </h1>
                </Link>

                <Nav />
            </div>
        </header>
    );
};

export default Header;
