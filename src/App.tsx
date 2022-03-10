import React from "react";
import Board from "./containers/Board";
import bg from "./styles/images/bg.jpg";
import "./app.scss";
function App() {
  return (
    <div className="App base" style={{ backgroundImage: `url(${bg})` }} >
      <Board />
    </div>
  );
}

export default App;
