import styled from "styled-components";

const TimeCardContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  font-size: 80px;
`;

interface IProps {
  minutes: React.ReactNode;
  seconds: React.ReactNode;
}

const Timer = ({ minutes, seconds }: IProps) => {
  return (
    <TimeCardContainer>
      {minutes} : {seconds}
    </TimeCardContainer>
  );
};

export default Timer;
