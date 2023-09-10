import { unsetUserInfo } from '../../features/userSlice';
import { unSetUserToken } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../services/LocalStorageService';
import React, { useState, useEffect } from 'react';
import { removeId } from '../../services/LocalStorageService';

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(true);

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: '', email: '' }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    removeId();
    window.location.href = '/auth/sign-in';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
      handleLogout();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      
      
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{showMessage && <p>Logging out...</p>}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">{!showMessage && <p>Logged out successfully!</p>}</p>
            
          </div>
        </main>
    </div>
  );
};

export default SignOut;
