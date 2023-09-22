import React from "react";

import Home from "./home-page/Home";
import { ThemeProvider, createUseStyles } from "react-jss";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";

const theme = {
  color: {
    grey: "red",
    lightGrey: "#9a9a9a",
    littleDarker: "#b5b5b5b5",
    lighter: "#d0d0d0d0",
  },
  fonts: {
    middleFont: "18px",
    smallFont: "16px",
    smallerFont: "14px",
    larg: "24px",
  },
};

const useStyles = createUseStyles(() => ({
  app: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "'Noto Sans Siddham', sans-serif",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="gallery" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
