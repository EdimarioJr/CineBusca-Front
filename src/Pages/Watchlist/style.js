import styled from "styled-components";
import { CommonButton } from "../../commonStyle";

export const WatchlistContainer = styled.main`
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

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 758px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
  }
  @media (min-width: 759px) and (max-width: 1013px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export const RemoveButton = styled(CommonButton)`
  width: 100%;
  margin-top: 5px;
  background-color: #fc0349;
  border-radius: 7px;

  @media (max-width: 475px) {
    width: 165px;
  }

  @media (min-width: 476px) and (max-width: 1109px) {
    width: 230px;
  }

  @media (min-width: 1110px) and (max-width: 1320px) {
    width: 260px;
  }
`;
