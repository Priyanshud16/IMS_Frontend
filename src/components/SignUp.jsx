import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input } from '@chakra-ui/react';

function SignupPage() {
  const [role, setRole] = useState('agent');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Validate input
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      // Send signup request
      const response = await axios.post("https://imsback-3.onrender.com/api/signup", { username, password, role });

      // Check for successful response
      if (response.status === 201) {
        alert("Signup Successfully")
        localStorage.setItem('token', response.data.token);
        navigate("/login");
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // Server responded with a status other than 201
        console.error("Server Error:", error.response.data);
        alert(`Error: ${error.response.data.message || 'Signup failed'}`);
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
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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

        <Button type='submit'>Signup</Button>
      </form>
    </div>
  );
}

export default SignupPage;
