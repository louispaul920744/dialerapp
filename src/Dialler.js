import React from "react";
import "./Dialler.css";
import KeypadButton from "./KeypadButton";

const Dialler = ({ number, setNumber }) => {
  //set no when typing
  const handleNumberChange = event => {
    setNumber(event.target.value);
  };
  //delete no when press backspace key
  const handleBackSpace = () => {
    setNumber(number.substring(0, number.length - 1));
  };
//set no when click on dialpad
  const handleNumberPressed = newNumber => {
    return () => {
      setNumber(`${number}${newNumber}`);
    };
  };

  return (
    //this in put filed keypadbutton is compnent for dial pad each nos
    <>
      <input
        type="tel"
        value={number}
        onChange={handleNumberChange}
        className="input"
      />
      <ol className="keypad">
        <li>
          <KeypadButton handleClick={handleNumberPressed("1")}>1</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("2")}>2</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("3")}>3</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("4")}>4</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("5")}>5</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("6")}>6</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("7")}>7</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("8")}>8</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("9")}>9</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("+")}>+</KeypadButton>
        </li>
        <li>
          <KeypadButton handleClick={handleNumberPressed("0")}>0</KeypadButton>
        </li>
        {number.length > 0 && (
          <li>
            <KeypadButton handleClick={handleBackSpace}>&lt;&lt;</KeypadButton>
          </li>
        )}
      </ol>
    </>
  );
};

export default Dialler;
