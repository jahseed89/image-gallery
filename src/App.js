import React from 'react';
import Home from './home-page/Home';
import { ThemeProvider } from 'react-jss';
import './app.css'
import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';

function App() {
  const theme = {
    color: {
      grey: "red",
      lightGrey: '#9a9a9a',
      littleDarker: '#b5b5b5b5',
      lighter: '#d0d0d0d0'

    },
    fonts: {
      middleFont: '18px',
      smallFont: '16px',
      smallerFont: '14px',
      larg: '24px'
    }
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
       <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='gallery' element={<Home />} />

       </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;