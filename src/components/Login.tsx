import { useContext } from "react";
import { signInWithGoogle,signOut } from "../firebaseconfig";
import AuthContext from "../context/AuthContext";

export default function Login() {
    const {user} = useContext(AuthContext);

    return(
        <div>
            <h2>This is the login page</h2>
            {user ?
            <button onClick={signOut}>Sign out</button> :
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            }
            
            <div>
                {user ?
                <div>
                <p>User: {user!.uid}</p>
                <p>Display Name: {user!.displayName}</p>
                <p>Email: {user!.email}</p>
                { !!user!.photoURL && <p>Photo: <img src={user!.photoURL} alt=""/></p> }
                </div> :
                ""}
            </div>
        </div>
    )
}