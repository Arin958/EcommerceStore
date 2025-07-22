import { useState } from "react";
import "./App.css";
import Routers from "./Router/Route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer />
      <Routers />
    </>
  );
}

export default App;
