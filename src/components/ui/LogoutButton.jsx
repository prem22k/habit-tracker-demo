import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut } from 'lucide-react';
import { Button } from './Button';

const LogoutButton = ({ className = '' }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={`text-gray-400 hover:text-white transition-colors ${className}`}
    >
      <LogOut className="w-5 h-5 mr-2" />
      Logout
    </Button>
  );
};

export default LogoutButton; 