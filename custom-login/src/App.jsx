import React, {useState} from 'react'
import './App.css'
import AuthForm from './AuthForm.jsx'
import HomePage from './pages/HomePage.jsx';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <HomePage user={user} onLogout={() => setUser(null)} />
      ) : (
          <AuthForm onLogin={(user) => setUser(user)} />
      )}
    </div>
  );
}

export default App;
