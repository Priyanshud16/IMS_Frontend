import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <ChakraProvider>
      <App />
      </ChakraProvider>
    </AuthContextProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
