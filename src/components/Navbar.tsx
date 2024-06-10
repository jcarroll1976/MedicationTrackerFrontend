/*import { useContext } from "react"
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
}*/

import { useContext, useState } from "react"
import "./Navbar.css"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseconfig";
import { GiHamburgerMenu, GiMedicines } from "react-icons/gi";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

export default function Navbar() {
    const {user} = useContext(AuthContext);
    const [nav,setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className="Navbar">
            <div><h1>MediTrack</h1></div>
            <GiHamburgerMenu onClick={handleNav} className="mobile-nav" />
            {nav ? (
                <div className="mobile-div">
                    {user ? (
                        <div>
                            <Link to = {"/home"} className="mobile-link" onClick={handleNav}><AiOutlineHome size={20} /><span>Home</span></Link>
                            <Link to = {"/medications"} className="mobile-link" onClick={handleNav}><GiMedicines size={20} /><span>Medications</span></Link>
                            <Link to = {"/login"} className="mobile-link" onClick={signOut}><FaGoogle size={20} />Sign Out</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to = {"/home"} className="mobile-link" onClick={signInWithGoogle}><FaGoogle size={20} />Sign In With Google</Link>
                        </div>
                    )}
                </div>
            ) : (
                ""
            )} 
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





