import styled from "styled-components";
import { CommonButton, FlexRowBetween } from "../../commonStyle";

export const DivSearch = styled.div`
  width: 60%;
  height: 35px;
  background-color: #107ee5;

  input {
    height: 100%;
    width: 80%;
    background-color: white;
    padding: 10px;
    color: black;
    border: none;
  }

  button {
    width: 20%;
    border: none;
    cursor: pointer;
    color: white;
    background-color: inherit;
    font-weight: 700;
  }
`;

export const HeaderRow = styled(FlexRowBetween)`
  margin: 10px 0;

  img {
    width: 100px;
  }
`;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 60%;
`;

export const WatchlistButton = styled(CommonButton)`
  color: black;
  background-color: #05a6da;
`;

export const UserNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 10px;

  h3{
    color: white;
    border-bottom: 2px solid #107ee5;
    padding: 10px;
    cursor: pointer;
  }

  h3:hover{
    background-color:#107ee5;
    transition: all 1s;
  }
`