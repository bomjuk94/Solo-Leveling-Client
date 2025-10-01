import { useHandleFormSubmit } from "@/hooks/useHandleFormSubmit";

const LoginForm = () => {

  const {
    handleFormSubmit,
    usernameRef,
    userPasswordRef,
    formRef,
  } = useHandleFormSubmit()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="w-full max-w-sm bg-[var(--bg-dialog)] rounded-[var(--radius-twenty)] shadow-lg p-8 border border-[var(--border)]"
      >
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center font-serif">
          Login
        </h2>

        {/* Username */}
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
            placeholder="Enter username"
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
          />
        </div>

        {/* Password */}
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
            ref={userPasswordRef}
            placeholder="Enter password"
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          name="mode"
          value="login"
          className="w-full py-2 rounded-md bg-[var(--accent-blue)] text-white font-semibold hover:bg-[var(--accent-purple)] transition-colors cursor-pointer"
        >
          Login
        </button>

        {/* Extra Links */}
        <p className="text-center mt-4 text-sm text-[var(--text-muted)]">
          Don’t have an account?{" "}
          <a href="/register" className="text-[var(--accent-gold)] hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
