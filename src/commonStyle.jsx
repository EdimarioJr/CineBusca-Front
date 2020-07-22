import styled, { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #20242b;
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    height: 100%;
  }
`;

export const Container = styled.div`
  width: 85%;
  margin: 0 auto;
`;

export const FlexRowBetween = styled.div`
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
  padding: 15px 20px;
  color: white;
  font-weight: 700;
  height: 35px;
  border: none;
  cursor: pointer;
`;

export const LoadMore = styled(CommonButton)`
  width: 100%;
  margin: 30px 0;
  padding: 30px 0;
  font-weight: 700;
  font-size: 24px;
`;