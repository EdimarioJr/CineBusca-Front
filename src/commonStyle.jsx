import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    height: 100%;
    min-height: 100%;
  }

  body {
    background-color: #20242b;
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    height: 100%;
    min-height: 100%;

    
  }

  @media(max-width: 475px){

    body{
      font-size: 12px;
    }
      
    }
`;

export const Container = styled.div`
  width: 85%;
  margin: 0 auto;

  @media (max-width: 1152px) {
    width: 95%;
  }
`;

export const ContainerPages = styled(Container)`
  min-height: calc(100vh - 345px);

`;

export const FlexRowBetween = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CommonButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #107ee5;
  padding: 0 30px;
  color: white;
  font-weight: 700;
  height: 35px;
  border: none;
  cursor: pointer;

  @media(max-width: 475px){
    height: 30px;
    padding: 0 10px;
  }
`;

export const LoadMore = styled(CommonButton)`
  width: 100%;
  margin: 30px 0;
  padding: 30px 0;
  font-weight: 700;
  font-size: 24px;


  @media(max-width: 475px){
    font-size: 18px;
    padding: 20px 0;
  }
`;

export const upAnimation = {
  initial: { opacity: 0, y: -20 },
  final: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const opacityAnimation = {
  initial: { opacity: 0 },
  final: { opacity: 1, transition: { duration: 1 } },
};
