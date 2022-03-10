import React from "react";

const Boardheader = () => {
  return (
    <div className="board-header">
      <div className="left">
        <div className="board-header-text">Board Title</div>
        <div className="button">Star</div>
        <div className="button">Personal</div>
        <div className="button">Private</div>
      </div>
      <div className="right">
        <div className="button">Show menu</div>
        <div className="button">Butler</div>
      </div>
    </div>
  );
};

export default Boardheader;
