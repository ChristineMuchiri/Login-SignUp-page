import React, { useState } from 'react';
import { signIn, signUp } from 'aws-amplify/auth'
import './AuthForm.css'

export default function AuthForm({onLogin}) {
    const [mode, setMode] = useState(null);
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
            setMode(null);
        } catch (err) {
            alert(err.message);
        }
    };


    const handleLogin = async () => {
        try {

            const loggedUser = await signIn({
                username,
                password
            });
            alert('Login successful!');
            onLogin(loggedUser)
            setMode(null);
        } catch (err) {
            alert(`Login failed: ${err.message}`);
        }
    };


    return (
        <>
            <div className="main-content-area">
        <div className="auth-container">
            {!mode && (
                <>
                    <h2>Welcome to WhistleKE</h2>
                    <p>Speak Truth to Power, Anonymously</p>
                    <button className='primary-button' onClick={() => setMode('signup')}>
                        Create Alias
                    </button>
                    <button className='primary-button' onClick={() => setMode('login')}>
                        Access
                    </button>
                </>
            )}
            {(mode === 'signup' || mode === 'login') && (
                <div className='form-area'>
                    <h2>{mode === 'signup' ? 'Create Alias' : 'Access'}</h2>
                    <input
                        type='text'
                        placeholder='Alias'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='submit-button'
                        onClick={mode === 'signup' ? handleSignup : handleLogin}
                    >
                        {mode === 'signup' ? 'Create Alias' : 'Access'}
                    </button>
                    <button className='back-button' onClick={() => setMode(null)}>
                        Back
                    </button>
                </div>
            )}
                </div>
                </div>
        <footer>
        © 2025 WhistleKE 
    </footer>
        </>
    );
}
                    
      