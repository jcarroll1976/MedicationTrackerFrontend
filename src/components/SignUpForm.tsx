import { useState } from "react"

export default function SignUpForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
    <form>
        <label htmlFor="signupEmail">Email</label>
        <input
            type="email"
            value={email} 
        />
        <label htmlFor="signupPassword">Password</label>
        <input
            type="password"
            value={password}
        />
        <label htmlFor="comfirmSignupPassword">Confirm Password</label>
        <input
            type="password"
            value={confirmPassword}
        />
        <button type="submit">Submit</button>
    </form>
    )
}