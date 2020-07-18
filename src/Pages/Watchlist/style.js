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
`;

export const RemoveButton = styled(CommonButton)`
  width: 100%;
  margin-top: 5px;
  background-color: #fc0349;
  border-radius: 7px;
`;
