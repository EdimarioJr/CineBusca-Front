import styled from "styled-components";
import { CommonButton } from "../../commonStyle";

export const MovieContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;

  #poster {
    width: 400px;
    height: 550px;
  }

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    #poster {
      width: 55%;
      height: 80%;
      margin-bottom: 10px;
    }
  }
`;

export const BackgroundFilter = styled.div`
  width: 100%;
  height: 450px;
  background-image: url(${(props) => props.back});
  background-size: cover;
  position: absolute;
  filter: blur(15px);
  top: 0;
  left: 0;
`;

export const MovieInfo = styled.div`
position: relative;
  width: 100%;
  color: white;
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
    position: relative;
    margin: 20px 30px;
    height: 465px;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.5), -1px 1px rgba(0, 0, 0, 0.5),
      1px -1px rgba(0, 0, 0, 0.5), -1px -1px rgba(0, 0, 0, 0.5);

    .description {
      height: 240px;
      line-height: 30px;
      text-overflow: ellipsis;
      overflow: auto;
      font-size: 24px;
    }

    .genres {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      z-index: 2;
      margin: 10px 0;

      p {
        margin-right: 15px;
      }

      .genre-button{
        margin-right: 15px;
        margin-bottom: 5px;
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

  @media (max-width: 767px) {
    padding-top: 15px;

    h1 {
      font-size: 20px;
    }

    h2 {
      margin-bottom: 10px;
    }
    #director {
      font-size: 18px;
    }

    .info {
      margin: 10px 10px;
      height: 465px;
      .description {
        font-size: 15px;
        line-height: 20px;
        height: 250px;
      }

      .genres {
        p {
          margin-right: 10px;
        }

        .genre-button{
          margin-right: 5px;
        }
      }
    }

    .footer {
      padding: 10px 10px;
      font-size: 10px;
    }
  }

  @media (min-width: 1001px) and (max-width: 1100px) {
    .footer {
      font-size: 13px;
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

  @media (max-width: 500px) {
    margin: 20px 5px;
  }
`;
