import React, { useState } from "react";
import KeypadButton from "./KeypadButton";
import useLoudness from "./hooks/useLoudness";
import useMuteWarning from "./hooks/useMuteWarning";
import "./OnCall.css";

const OnCall = ({ handleHangup, connection }) => {
  //for mute and unmute
  const [muted, setMuted] = useState(false);
  //for loundness and all
  const [running, setRunning, loudness] = useLoudness();
  //show warning message
  const [showMuteWarning] = useMuteWarning(loudness, running);
//function for mute and all
  const handleMute = () => {
    // connection.mute(!muted);
    setMuted(!muted);
    setRunning(!muted);
  };
//show warning message
  const muteWarning = (
    <p className="warning">Are you speaking? You are on mute!</p>
  );

  return (
    /*for show warning message and keypad component for mute and hangup */
    <>
    
      {showMuteWarning && muteWarning}
      <div className="call">
        <div className="call-options">
          <KeypadButton handleClick={handleMute} color={muted ? "red" : ""}>
            {muted ? "Unmute" : "Mute"}
          </KeypadButton>
        </div>
        <div className="hang-up">
          <KeypadButton handleClick={handleHangup} color="red">
            Hang up
          </KeypadButton>
        </div>
      </div>
    </>
  );
};

export default OnCall;
