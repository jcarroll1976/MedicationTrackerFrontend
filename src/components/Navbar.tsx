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
                    <Link to = {"/home"} onClick={handleNav}><AiOutlineHome size={20} /><span>Home</span></Link>
                    <Link to = {"/medications"} onClick={handleNav}><GiMedicines size={20} /><span>Home</span></Link>
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





