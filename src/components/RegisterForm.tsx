import React, { useRef } from "react";

const RegisterForm = () => {
    const registerFormRef = useRef<HTMLFormElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const registerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Username:", usernameRef.current?.value);
        console.log("Password:", passwordRef.current?.value);

        // validate inputs here
        // request to API to create user
        // return any errors
        // navigate user to login or dashboard

        // reset form
        registerFormRef.current?.reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
            <form
                ref={registerFormRef}
                onSubmit={registerSubmit}
                className="w-full max-w-sm bg-[var(--bg-dialog)] rounded-[var(--radius-twenty)] shadow-lg p-8 border border-[var(--border)]"
            >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center font-serif">
                    Register
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-[var(--text-muted)] text-sm mb-1"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        ref={usernameRef}
                        placeholder="Choose a username"
                        className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-[var(--text-muted)] text-sm mb-1"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        ref={passwordRef}
                        placeholder="Create a password"
                        className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 rounded-md bg-[var(--accent-green)] text-white font-semibold hover:bg-[var(--accent-purple)] transition-colors"
                >
                    Create Account
                </button>

                <p className="text-center mt-4 text-sm text-[var(--text-muted)]">
                    Already have an account?{" "}
                    <a href="/login" className="text-[var(--accent-gold)] hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
