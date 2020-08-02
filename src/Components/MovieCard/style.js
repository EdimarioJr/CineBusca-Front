import styled from "styled-components";

export const MovieContainer = styled.div`
  background-color: #383d48;
  color: white;
  width: 275px;
  height: 460px;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    border: 1px solid #107ee5;
    background-color: #107ee5;
    position: relative;
    top: -20px;
    transition: all 0.5s;
  }

  img {
    height: 80%;
    width: 100%;
    border-radius: 7px;
  }

  .legend {
    width: 100%;
    padding: 10px 0;
    padding-left: 15px;
    padding-right: 10px;

    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  @media (max-width: 475px) {
    width: 165px;
    height: 330px;
  }

  @media (min-width: 476px) and (max-width: 1109px) {
    width: 230px;
    height: 450px;
  }

  @media (min-width: 1110px) and (max-width: 1320px) {
    width: 260px;
    height: 450px;
  }
`;
