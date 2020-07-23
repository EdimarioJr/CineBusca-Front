import styled from "styled-components";
import { CommonButton } from "../../commonStyle";

export const MovieContainer = styled.section`
  width: 100%;
  height: 550px;
  display: grid;
  grid-template-columns: 1fr 4fr;

  #poster {
    width: 400px;
    height: 550px;
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
  z-index: 2;
  background-color: black;
  h2 {
    margin-bottom: 20px;
  }

  h1 {
    margin-bottom: 10px;
    font-size: 30px;
  }

  #director {
    font-weight: 300;
    font-size: 24px;
  }

  .info {
    margin: 20px 30px;
    height: 465px;
    position: inherit;
    z-index: 2;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5), -1px 1px rgba(0, 0, 0, 0.5),
      1px -1px rgba(0, 0, 0, 0.5), -1px -1px rgba(0, 0, 0, 0.5);

    .description {
      position: inherit;
      z-index: 2;
      margin: 10px 0;
      height: calc(100% - 190px);
      line-height: 30px;
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

  .rowButtons {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
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
  width: 180px;
  color: black;
  background-color: #02bea7;
  margin-right: 15px;
`;

export const ReviewButton = styled(CommonButton)`
  width: 180px;
`;

export const AddReview = styled(CommonButton)`
  background-color: #2caf1e;
  margin-right: 10px;
`;
export const CancelReview = styled(CommonButton)`
  background-color: #fc0349;
`;

export const ReviewContainer = styled.section`
  margin: 20px 30px;
  position: relative;
  z-index: 2;

  textarea {
    border: 1px solid #888;
    background-color: #20242b;
    color: white;
    font-size: 16px;
    padding: 10px;
    overflow: auto;
    resize: none;
    width: 100%;
    height: 350px;
    margin-bottom: 15px;
    font-family: "Poppins", sans-serif;
  }
`;
