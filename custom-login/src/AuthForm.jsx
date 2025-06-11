import React, { useState } from 'react';
import { signIn, signUp } from 'aws-amplify/auth'
import './AuthForm.css'

export default function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSignup = async () => {
        try {
            await signUp({
                username: username,
                password,
                options: {
                    userAttributes: {
                        preferred_username: username,
                    }
                }
            });
            alert('Signup successful.');
        } catch (err) {
            alert(err.message);
        }
    };


    const handleLogin = async () => {
        try {
            await signIn({
                username,
                password
            });
            alert('Login successful!');
        } catch (err) {
            alert(`Login failed: ${err.message}`);
         }
};


    return (
    <div className="auth-container">
      <input
        type="text"
        placeholder="Choose username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

