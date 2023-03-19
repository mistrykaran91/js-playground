import React from "react";
import "./App.css";
import CodeCell from "./components/code-cell";
import Header from "./components/header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <CodeCell />
    </>
  );
};

export default App;
