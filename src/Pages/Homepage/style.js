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

  @media (max-width: 735px) {
    .grid-movies {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 5px;
    }

    h1 {
      font-size: 30px;
      margin: 20px 0;
    }
  }

  @media (min-width: 736px) and (max-width: 979px) {
    .grid-movies {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
