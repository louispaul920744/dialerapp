import React, { useState, useEffect } from "react";
import { Device } from "twilio-client";
import Dialler from "./Dialler";
import KeypadButton from "./KeypadButton";
import Incoming from "./Incoming";
import OnCall from "./OnCall";
import "./Phone.css";
import states from "./states";
import FakeState from "./FakeState";

const Phone = ({ token }) => {
  //for seting the state
  const [state, setState] = useState(states.CONNECTING);
  //for setting no
  const [number, setNumber] = useState("");
  //for  connecting
  const [conn, setConn] = useState(null);
  //for seting device
  const [device, setDevice] = useState(null);

  useEffect(() => {
    //for creating twillio client device
    const device = new Device();
//it will setup token and all
    device.setup(token, { debug: true });
//check device is ready by using twillio client
    device.on("ready", () => {
      setDevice(device);
      setState(states.READY);
    });
    //connect device  by using twillio client
    device.on("connect", connection => {
      console.log("Connect event");
      setConn(connection);
      setState(states.ON_CALL);
    });
    //disconnect device  by using twillio client
    device.on("disconnect", () => {
      setState(states.READY);
      setConn(null);
    });
    //for connecting incoming call
    device.on("incoming", connection => {
      setState(states.INCOMING);
      setConn(connection);
      connection.on("reject", () => {
        setState(states.READY);
        setConn(null);
      });
    });
    //for canceling call
    device.on("cancel", () => {
      setState(states.READY);
      setConn(null);
    });
    //for reject call
    device.on("reject", () => {
      setState(states.READY);
      setConn(null);
    });
//this for destroy after comunictaion using twillio client
    return () => {
      device.destroy();
      setDevice(null);
      setState(states.OFFLINE);
    };
  }, [token]);
//this function call of that number we are specified
  const handleCall = () => {
    device.connect({ To: number });
  };
//this for dis caonnect all call when hangup the call
  const handleHangup = () => {
    device.disconnectAll();
  };

  let render;
//it is for seting incoming call and on call and other render render the dialerpad
  if (conn) {
    if (state === states.INCOMING) {
      render = <Incoming device={device} connection={conn}></Incoming>;
    } else if (state === states.ON_CALL) {
      render = <OnCall handleHangup={handleHangup} connection={conn}></OnCall>;
    }
  } else {
    render = (
      <>
        <Dialler number={number} setNumber={setNumber}></Dialler>
        <div className="call">
          <KeypadButton handleClick={handleCall} color="green">
            Call
          </KeypadButton>
        </div>
      </>
    );
  }
  return (
    <>
      <FakeState
        currentState={state}
        setState={setState}
        setConn={setConn}
      ></FakeState>
      {render}
      <p className="status">{state}</p>
    </>
  );
};

export default Phone;
