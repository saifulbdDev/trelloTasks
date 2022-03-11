import React from "react";
import Board from "./containers/Board";
import Header from "./components/Header/template";
import Boardbar from "./components/Boardbar/template";
// import bg from "./styles/images/bg.jpg";
import "./app.scss";
function App() {
  return (
    <div className="App base" >
      <Header />
      <Boardbar />
      <Board />
    </div>
  );
}

export default App;
