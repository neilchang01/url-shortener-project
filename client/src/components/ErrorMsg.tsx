import React from "react";

const ErrorMsg = ({ message }: { message: string }) => {
  return <p className="error">{message}</p>;
};

export default ErrorMsg;
