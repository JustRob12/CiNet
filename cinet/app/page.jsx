"use client"; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import Login from '../components/Login';
import { SignupFormDemo } from '../components/Signup';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  useEffect(() => {
    // Set the background color of the body to black
    document.body.style.backgroundColor = 'black';

    // Cleanup function to reset the background color on component unmount
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div style={styles.container}>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} /> // Pass setIsLogin to Login component
      ) : (
        <SignupFormDemo setIsLogin={setIsLogin} /> // Pass setIsLogin to SignupFormDemo
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "black",
    maxWidth: '500px',
    margin: '90px auto',
    textAlign: 'left',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
};
