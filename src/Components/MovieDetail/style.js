import styled from "styled-components";
import { CommonButton } from "../../commonStyle";

export const MovieContainer = styled.section`
  width: 100%;
  height: 550px;
  display: grid;
  grid-template-columns: 1fr 4fr;

  #poster {
    width: 400px;
    height: 100%;
  }
`;

export const BackgroundFilter = styled.div`
  width: 100%;
  height: 550px;
  background-image: url(${(props) => props.back});
  background-size: cover;
  position: absolute;
  filter: blur(30px);
  top: 0;
  left: 0;
  z-index: 1;
`;

export const MovieInfo = styled.div`
  color: white;
  position: relative;
  z-index: 9999;
  background-color: black;
  h2 {
    margin-bottom: 20px;
  }

  .info {
    margin: 20px 30px;
    height: calc(100% - 85px);
    position: inherit;
    z-index: 2;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5), -1px 1px rgba(0, 0, 0, 0.5),
      1px -1px rgba(0, 0, 0, 0.5), -1px -1px rgba(0, 0, 0, 0.5);
    h1 {
      margin-bottom: 20px;
      font-size: 30px;
    }

    .description {
      position: inherit;
      z-index: 2;
      margin: 10px 0;
      line-height: 30px;
      height: 300px;
      text-overflow: ellipsis;
      overflow: auto;
      font-size: 24px;
    }

    .genres {
      position: inherit;
      z-index: 2;
      display: flex;
      flex-direction: row;
      align-items: center;

      margin: 10px 0;

      p {
        margin-right: 15px;
      }
    }
  }

  .footer {
    position: inherit;
    z-index: 2;
    width: 100%;
    background-color: #2c2f38;
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    aside {
      margin-right: 20px;
      display: flex;
      flex-direction: row;
      p {
        margin-right: 5px;
      }
    }
  }
`;

export const WatchButton = styled(CommonButton)`
  color: black;
  background-color: #02bea7;
  margin-bottom: 20px;
`;
