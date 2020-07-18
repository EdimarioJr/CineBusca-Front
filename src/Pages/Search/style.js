import styled from "styled-components";

export const SearchContainer = styled.main`
  width: 100%;

  h1 {
    color: white;
    margin-bottom: 30px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
`;

