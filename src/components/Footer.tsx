
const Footer = () => {
    return (
        <footer className="w-full bg-[var(--bg-dialog)] border-t border-[var(--border)] shadow-sm mt-10">
            <div className="max-w-[var(--spacing-desktop-width)] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center text-sm text-[var(--text-muted)]">

                {/* Left side - copyright */}
                <p className="mb-2 sm:mb-0">
                    © {new Date().getFullYear()} Solo Leveling
                </p>
            </div>
        </footer>
    );
};

export default Footer;
