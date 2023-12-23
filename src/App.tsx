/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import SnowFall from "./SnowFlakeEffect";
import bg from "/backgroundImg.jpg";
import santa from "../public/santa.png";
import FinishSound from "./SoudController";
import youwin from "../src/assets/audio/youwin.mp3";
import youlose from "../src/assets/audio/youlose.mp3";
import BackgroundSnowFall from "./BackgroundSnowFall";
import silentNight from "../src/assets/audio/silent_night.mp3";

// import FinishSound from "./SoudController";
const App: React.FC = () => {
  const [snowSpeed, setSnowSpeed] = React.useState(300);
  const [status, setStatus] = useState<"ready" | "playing" | "win" | "lose">("ready");
  const [playTime, setPlayTime] = useState<number>(0);
  return (
    <div
      style={{
        zIndex: 0,
        backgroundImage: `url(${bg})`,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <BackgroundSnowFall />
      <FinishSound soundUrl={silentNight} stopSound={() => {}} />

      {status === "lose" && (
        <FinishSound
          soundUrl={youlose}
          stopSound={() => {
            setStatus("ready");
            setSnowSpeed(300);
            setPlayTime(0);
          }}
        />
      )}
      {status === "win" && (
        <FinishSound
          soundUrl={youwin}
          stopSound={() => {
            setStatus("ready");
            setSnowSpeed(50);
            setPlayTime(0);
          }}
        />
      )}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", zIndex: "2" }}
      >
        <img src={santa} alt="santa" style={{ width: "100px", height: "100px", userSelect: "none" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontWeight: "700",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              userSelect: "none",
            }}
          >
            {status === "ready" && "10초 내로 모든 눈을 치우면 승리!"}
            {status === "win" && "🎉🎉🎉🎉You Win🎉🎉🎉🎉🎉"}
            {status === "lose" && "You lose 😭"}
            {status === "playing" &&
              (snowSpeed === 10
                ? "폭설이 내리는 중!"
                : snowSpeed === 300
                ? "보통 눈이 내리는 중!"
                : snowSpeed === 50
                ? "이것도 한번 해보슈"
                : "쉬운 길을 가시겠다고요?")}
          </span>
          {status === "playing" && (
            <span style={{ fontSize: "20px", alignItems: "center" }}>{10 - playTime}초 남았어유</span>
          )}
        </div>
      </div>
      {status == "ready" && (
        <button onClick={() => setStatus("playing")} style={{ zIndex: "2" }}>
          Are you ready?
        </button>
      )}
      {status == "playing" && (
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <button onClick={() => setSnowSpeed(10)} style={{ zIndex: "2" }}>
            폭설
          </button>
          <button onClick={() => setSnowSpeed(300)} style={{ zIndex: "2" }}>
            보통 눈
          </button>
          <button onClick={() => setSnowSpeed(800)} style={{ zIndex: "2" }}>
            Easy mode~~
          </button>
        </div>
      )}
      {status == "playing" && (
        <>
          <SnowFall playTime={playTime} setPlayTime={setPlayTime} setStatus={setStatus} snowSpeed={snowSpeed} />
        </>
      )}
    </div>
  );
};

export default App;
