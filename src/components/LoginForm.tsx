import { useEffect, useState, useRef } from "react"

const LoginForm = () => {

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const loginSubmit = (e) => {
          e.preventDefault();
    console.log("Submitted:", nameRef.current?.value);
        // Validate user inputs client side
        // Request to api to authenticate
        // Return any errors
        // Navigate user to dashboard page if successful login
    }

  return (
    <form
        onSubmit={loginSubmit}
    >
            <input
        type="text"
        ref={usernameRef}
      />
               <input
        type="text"
        ref={passwordRef}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm