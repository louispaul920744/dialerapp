import React from "react";

const Incoming = ({ connection, device }) => {
  //for accept call
  const acceptConnection = () => {
    connection.accept();
  };
  //for reject call
  const rejectConnection = () => {
    connection.reject();
  };
  return (
    <>
      <button onClick={acceptConnection}>Accept</button>
      <button onClick={rejectConnection}>Reject</button>
    </>
  );
};

export default Incoming;
