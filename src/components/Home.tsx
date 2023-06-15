import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Timer from "./Timer";
import TimerCard from "./TimerCard";
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 50px;
  height: 200px;
  font-size: 100px;
`;
const IButton = styled(motion.button)`
  width: 100px;
  height: 100px;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #77a88f;
  color: #fff;
  border-radius: 100%;
  font-size: 80px;
`;
const Result = styled.div`
  width: 500px;
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 30px;
`;
const ResultText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const initialTime = 1500; // 초기 시간 (25분)을 초 단위로 저장
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [countRound, setCountRound] = useState<number>(0);
  const [countGoal, setCountGoal] = useState<number>(0);
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [isFirstSecond, setIsFirstSecond] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && time > 0) {
      //타이머가 진행중일때
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time <= 0) {
      // 타이머가 끝났을 때
      setTime(initialTime);
      setIsRunning(false);
      setCountRound((prevCount) => prevCount + 1);
    }

    if (countRound === 4) {
      setCountGoal((prevCount) => prevCount + 1);
      setCountRound(0);
    }
    if (countGoal === 12) {
      setCountGoal(0);
      setCountRound(0);
    }
    const formatTime = (time: number): { minutes: string; seconds: string } => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return { minutes, seconds };
    };

    //setMinutes, setSeconds 추가
    const timeFormatted = formatTime(time);
    setMinutes(timeFormatted.minutes);
    setSeconds(timeFormatted.seconds);

    seconds === "59" ? setIsFirstSecond(true) : setIsFirstSecond(false);

    return () => clearInterval(timer);
  }, [isRunning, time, initialTime, countRound, countGoal, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  //TimeCard scale 추가
  const Minutes = ({ minutes }: { minutes: string }) => {
    return <TimerCard value={minutes} initialScale={isFirstSecond ? 0.7 : 1} />;
  };

  const Seconds = ({ seconds }: { seconds: string }) => {
    return <TimerCard value={seconds} initialScale={0.7} />;
  };

  return (
    <Wrapper>
      <Title>Pomodoro</Title>
      <Timer
        minutes={<Minutes minutes={minutes} />}
        seconds={<Seconds seconds={seconds} />}
      />
      <IButton
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.7 }}
        onClick={isRunning ? handlePause : handleStart}
      >
        {isRunning ? <BsFillPauseFill /> : <BsPlayFill />}
      </IButton>
      <Result>
        <ResultText>
          <p>{countRound}/4</p>
          <p>ROUND</p>
        </ResultText>
        <ResultText>
          <p>{countGoal}/12</p>
          <p>GOAL</p>
        </ResultText>
      </Result>
    </Wrapper>
  );
};

export default Home;
