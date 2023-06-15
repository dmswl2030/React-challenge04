import styled from "styled-components";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  width: 180px;
  height: 220px;
  margin: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #77a88f;
  font-size: 100px;
`;

const CardText = styled.span`
  font-size: 80px;
`;

const TimerCard = ({
  value,
  initialScale
}: {
  value: string;
  initialScale: number;
}) => {
  return (
    <Card
      initial={{ scale: initialScale }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CardText>{value}</CardText>
    </Card>
  );
};

export default TimerCard;
