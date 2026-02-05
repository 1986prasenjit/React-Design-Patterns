import React from "react";
import TimerPage from "./pages/TimerPage";

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10 mb-10 font-mono text-capitalize">
        Controlled & UnControlled Component
      </h1>
      <div className=" flex mt-10 items-center justify-center">
        <TimerPage />
      </div>
    </>
  );
};

export default App;
