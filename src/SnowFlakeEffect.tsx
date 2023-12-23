/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

interface Snowflake {
  id: number;
  top: number;
  left: number;
}

interface SnowFallProps {
  snowSpeed: number;
  setStatus: (value: "ready" | "win" | "lose") => void;
  playTime: number;
  setPlayTime: React.Dispatch<React.SetStateAction<number>>;
}

const SnowFall: React.FC<SnowFallProps> = ({ snowSpeed, setStatus, playTime, setPlayTime }) => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // 일정 시간마다 새로운 snowflake을 추가합니다.
      setSnowflakes((prevSnowflakes) => [
        ...prevSnowflakes,
        {
          id: Date.now(),
          top: (Math.random() * window.innerHeight) / 2,
          left: (Math.random() * window.innerWidth) / 2,
        },
      ]);
    }, snowSpeed);

    // 컴포넌트가 언마운트될 때 interval을 정리합니다.
    return () => clearInterval(interval);
  }, [snowSpeed]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setPlayTime((prevTime: number) => prevTime + 1);
    }, 1000);

    // 컴포넌트가 마운트된 후 10초 뒤에 checkGameOver 함수를 호출합니다.
    const timeoutId = setTimeout(() => {}, 10000);

    // 컴포넌트가 언마운트될 때 timeout을 정리합니다.
    return () => {
      clearTimeout(timeoutId);
      clearInterval(timerInterval);
    };
  }, []); // 빈 의존성 배열은 마운트된 후 한 번만 실행되도록 보장합니다.

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const { clientX, clientY } = event;
      removeSnowflake(clientX, clientY);
    }
  };

  const removeSnowflake = (x: number, y: number) => {
    setSnowflakes((prevSnowflakes: Snowflake[]) => {
      const updatedSnowflakes = prevSnowflakes.filter((snowflake) => {
        const rect = document.getElementById(String(snowflake.id))?.getBoundingClientRect();
        if (rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return false; // 클릭한 위치에 snowflake이 있으면 제거합니다.
        }
        return true;
      });

      return updatedSnowflakes;
    });
    checkGameOver();
  };

  const checkGameOver = () => {
    const remainingSnowflakes = snowflakes;

    if (playTime >= 3 && remainingSnowflakes.length === 0) {
      setStatus("win");
      return;
    }
    if (playTime >= 10 && remainingSnowflakes.length > 0) {
      setStatus("lose");
      return;
    }
    console.log(remainingSnowflakes.length);
  };

  useEffect(() => {
    checkGameOver();
  }, [playTime]);

  return (
    <div
      style={{
        zIndex: 10,
        position: "relative",
        backgroundColor: "transparent",
        cursor: "pointer",
        top: 0,
        height: "50vh",
        width: "50vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50vw",
          height: "50vh",
          position: "absolute",
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {snowflakes.map((snowflake) => (
          <div
            key={snowflake.id}
            id={String(snowflake.id)}
            style={{
              position: "absolute",
              top: snowflake.top,
              left: snowflake.left,
              width: "40px",
              height: "40px",
              backgroundColor: "#ffffffce",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 10, right: 10 }}>플레이 시간: {playTime}s</div>
    </div>
  );
};

export default SnowFall;
