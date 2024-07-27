import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContextProvider';
import { Button, Input } from '@chakra-ui/react';

function LoginPage() {
  const [role, setRole] = useState('agent');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {LoginUser}=useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Validate input
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      // Send login request
      const response = await axios.post("https://imsback-3.onrender.com/api/login", { username, password, role });

      // Check for successful response
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        LoginUser(response.data.token)
        navigate(role === 'admin' ? "/admin" : "/agent");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // Server responded with a status other than 200
        console.error("Server Error:", error.response.data);
        alert(`Error: ${error.response.data.message || 'Login failed'}`);
      } else if (error.request) {
        // No response was received
        console.error("Network Error:", error.request);
        alert("Network error. Please try again later.");
      } else {
        // Other errors
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          w={250}
        />
         <br />
         <br />
        <Input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          w={250}
        />
       
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <br />
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
}

export default LoginPage;
