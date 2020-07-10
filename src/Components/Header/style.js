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
  margin: 20px 0;

  img {
    width: 100px;
  }
`;

export const InputsRow = styled(FlexRowBetween)`
  width: 45%;
`;

export const WatchlistButton = styled(CommonButton)`
  color: black;
  background-color: #05a6da;
`;
