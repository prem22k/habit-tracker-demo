import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Landing from './components/Landing';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated && <Landing />}
      {/* Add authenticated content here later */}
    </div>
  );
}

export default App; 