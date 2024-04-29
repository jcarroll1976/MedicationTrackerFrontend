import { useContext } from "react";
import { signInWithGoogle,signOut } from "../firebaseconfig";
import AuthContext from "../context/AuthContext";
import loginImage from "../../src/towfiqu-barbhuiya-w8p9cQDLX7I-unsplash.jpg";

import "./Login.css";

export default function Login() {
    const {user} = useContext(AuthContext);

    return (
        <div className="login-container">
            <img className="login-image" src={loginImage} alt="" />
                <div className="login-content">
                    <h1 className="login-title">MediTrack</h1>
                    <h3>Stay Healthy, Stay on Track.</h3>
                    <ul className="features">
                        <li>Never miss a dose again with reminder notifications.</li>
                        <li>Track your medications and refills seamlessly.</li>
                        <li>Log dosages and manage your medication schedule.</li>
                        <li>Securely access your medication information anytime, anywhere.</li>
                    </ul>
                    {user ?
                    <div><button className="login-button" onClick={signOut}>Sign out</button></div> :
                    <div><button className="login-button" onClick={signInWithGoogle}>Sign in with Google</button></div>
                    }
                </div>
                
            </div>
    )
            
    
}