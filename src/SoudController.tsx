import React from "react";
import ReactHowler from "react-howler";

const FinishSound: React.FC<{
  soundUrl: string;
  stopSound: (value: boolean) => void;
}> = ({ soundUrl, stopSound }) => {
  return (
    <div>
      <ReactHowler src={soundUrl} playing={true} onEnd={() => stopSound(false)} />
    </div>
  );
};

export default FinishSound;
