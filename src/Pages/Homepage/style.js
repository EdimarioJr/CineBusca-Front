import styled from "styled-components";

export const Main = styled.section`
  width: 100%;

  h1 {
    color: white;
    margin: 30px 0;
    font-size: 36px;
  }

  .grid-movies {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    transition: all 0.5s;
  }
`;
