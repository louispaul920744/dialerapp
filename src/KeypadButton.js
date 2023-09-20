import React from "react";
import "./KeypadButton.css";
//it for keypad
const KeypadButton = ({ children, handleClick, color = "" }) => {
  return (
    <button className={`keypad-button ${color}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default KeypadButton;
