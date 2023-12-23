import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface Snowflake {
  id: number;
  top: number;
  left: number;
}

const snowfallAnimation = keyframes`
  to {
    transform: translateY(100vh);
  }
`;

const SnowflakeWrapper = styled.div`
  position: absolute;
  font-size: 20px;
  user-select: none;
  color: #ddfaff;
  animation: ${snowfallAnimation} 5s linear infinite;
`;

const BackgroundSnowFall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new snowflake periodically
      setSnowflakes((prevSnowflakes) => [
        ...prevSnowflakes,
        {
          id: Date.now(),
          top: Math.random() * window.innerHeight,
          left: Math.random() * window.innerWidth,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {snowflakes.map((snowflake) => (
        <SnowflakeWrapper
          key={snowflake.id}
          style={{
            top: snowflake.top,
            left: snowflake.left,
          }}
        >
          ❄
        </SnowflakeWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  height: 100%;
  overflow: hidden;
  width: 100%;
  border-radius: 10px;
  z-index: 1;
`;

export default BackgroundSnowFall;
