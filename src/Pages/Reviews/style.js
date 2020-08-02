import styled from "styled-components";
import { motion } from "framer-motion";

export const ReviewsContainer = styled(motion.main)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  color: white;


  @media(max-width: 900px){
    grid-template-columns: 1fr;
  }
`;
