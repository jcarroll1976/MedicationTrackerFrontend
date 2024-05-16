import { useContext } from "react"
import "./Navbar.css"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseconfig";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
    const {user} = useContext(AuthContext);

    return (
        <div className="Navbar">
            <div><h1>MediTrack</h1></div>
            <div className="navButtons">
                {user ?
                <span>
                    <Link to = {"/home"}>
                        <button className="login-button">Home</button>
                    </Link>
                    <Link to = {"/medications"}>
                        <button className="login-button">Medications</button>
                </Link>
                </span> :
                <span></span>
                }
                 {user ?
             <button className="login-button" onClick={signOut}>Sign out</button>:
            <button className="login-button" onClick={signInWithGoogle}>Sign in with Google</button>}
            </div>
        </div>
    )
}


