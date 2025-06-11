import React, { useState } from 'react';
import { signIn, signUp, confirmSignUp, signOut } from 'aws-amplify/auth'

export default function AuthForm() {
    const [createAlias, setCreateAlias] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [step, setStep] = useState('auth');

    const toggleForm = () => async () => setCreateAlias(!createAlias);

    const handleSignup = async () => {
        try {
            await signUp({ username, password });
            alert('Signup successful. Check confirmation code');
            setStep('confirm');
        } catch (err) {
            alert(err.message);
        }
    };

    const handleConfirm = async () => {
        try {
            await confirmSignUp(username, confirmationCode);
            alert('Account confirmed! login in');
            setStep('auth');
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogin = async () => {
        try {
            const user = await signIn(username, password);
            console.log(user);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            alert('Logged out');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
    <div className="p-4 max-w-sm mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">
        {step === 'confirm'
          ? 'Confirm Your Account'
          : createAlias
          ? 'Sign Up'
          : 'Log In'}
      </h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {step === 'confirm' ? (
        <>
          <input
            type="text"
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChange={e => setConfirmationCode(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 w-full">
            Confirm
          </button>
        </>
      ) : (
        <>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <button
            onClick={createAlias ? handleSignup : handleLogin}
            className="bg-blue-500 text-white px-4 py-2 w-full mb-2"
          >
            {createAlias ? 'Sign Up' : 'Log In'}
          </button>

          <button onClick={toggleForm} className="text-blue-600 text-sm">
            {createAlias ? 'Already have an account?' : "Don't have an account?"}
          </button>
        </>
      )}

      <hr className="my-4" />

      <button onClick={handleLogout} className="bg-gray-200 text-black px-4 py-2 w-full">
        Log Out
      </button>
    </div>
  );
}
