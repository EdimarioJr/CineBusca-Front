import styled from "styled-components";
import { motion } from "framer-motion";

export const Ball = styled(motion.span)`
  display: block;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const LoadingContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;
