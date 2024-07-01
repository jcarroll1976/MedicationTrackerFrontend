import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { GiMedicines } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import "./Homepage.css";
import { Link, Navigate } from "react-router-dom";

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

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="homepage-container">
            <h1>{greetingMessage}</h1>
            <div className="homepageIcon-container">
                <Link to = {"/medications"}>
                    <div className="icon-div">
                        <h3>Your Medications</h3>
                        <p>Find All Your Medications Here.</p>
                        <GiMedicines size={120} color="skyblue" />
                    </div>
                </Link>
                <Link to = {"/user-logs"}>
                    <div className="icon-div">
                    <h3>Your Dosage Logs</h3>
                    <p>Find A Log Of Your Medication Doses Here.</p>
                    <CiViewList size={120} color="skyblue" />
                </div>
                </Link>
            
           
            </div>
        </div>
    )
}