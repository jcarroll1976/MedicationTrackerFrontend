import { useState } from "react";

import "./SignUpForm.css";

export default function SignUpForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div className="signup-container">
            <div className="form-container">
                <form className="signup-form">
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
            </div>
        </div>
    )
}