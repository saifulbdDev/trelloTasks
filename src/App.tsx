import React from "react";
import "./scss/App.scss";
import Navbar from "./Components/Navbar";
import Boardheader from "./Components/Boardheader";
function App() {
  return (
    <div className="App base">
      <Navbar />
      <div className="board">
        <Boardheader />
        <div className="board-lists">
          <div className="board-list">
            <div className="list-title">List title</div>
            <div className="card">Card 1</div>
            <div className="card">Card 2</div>
            <div className="card">Card 3</div>
            <div className="card">Card 4</div>
            <div className="card">Card 5</div>
            <div className="add-card">+ Add another card</div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default App;
