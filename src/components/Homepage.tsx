import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Home() {
    const {user} = useContext(AuthContext);

    let date = new Date();
    let greetingMessage = "";

    if (date.getHours() < 12) {
         greetingMessage = `Good Morning, ${user?.displayName}`;
    }
    else if (date.getHours() >= 12 && date.getHours() < 18) {
        greetingMessage = `Good Afternoon, ${user?.displayName}`;
    }
    else if (date.getHours() >= 18 && date.getHours() < 24) {
        greetingMessage = `Good Evening, ${user?.displayName}`;
    }

    return (
        <h1>{greetingMessage}</h1>

    )
}