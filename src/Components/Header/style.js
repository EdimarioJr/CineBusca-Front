import styled from "styled-components";
import { CommonButton } from "../../commonStyle";
import { motion } from "framer-motion";

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

  @media (max-width: 475px) {
    width: 75%;
    height: 30px;
    input {
      padding: 5px;
    }
  }
`;

export const HeaderRow = styled.header`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  img {
    width: 100px;
  }

  @media (max-width: 414px) {
    flex-direction: column;

    img {
      width: 85px;
      margin-bottom: 10px;
    }
  }
`;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 60%;

  @media (max-width: 475px) {
    width: 95%;
  }
`;

export const WatchlistButton = styled(CommonButton)`
  color: black;
  background-color: #05a6da;
`;

export const UserNav = styled(motion.nav)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 10px;

  h3 {
    color: white;
    border-bottom: 2px solid #107ee5;
    padding: 10px;
    cursor: pointer;
  }

  h3:hover {
    background-color: #107ee5;
    transition: all 1s;
  }

  #watch {
    background-color: ${(props) => (props.watchlist ? "#107ee5" : "")};
  }

  #review {
    background-color: ${(props) => (props.review ? "#107ee5" : "")};
  }
`;
