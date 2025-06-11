import React from "react";
import './HomePage.css';
import { signOut } from 'aws-amplify/auth';

function HomePage({ user, onLogout }) {
    const handleLogout = async () => {
        await signOut();
        onLogout();
    }
    return (
        <div className="home">
            <h1>This is my home page</h1>
            <h1>Welcome, {user.username}</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default HomePage;