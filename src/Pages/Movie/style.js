import styled from "styled-components";

export const CastContainer = styled.section`
  background-color: black;
  width: 100%;
  padding: 20px;

  h1 {
    color: white;
    margin-top: 1 0px;
    margin-bottom: 20px;
  } 

`;

export const CastCards = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;

  .actorCard {
    margin-right: 30px;
    height: 350px;
    width: 200px;
    background-color: #c4c4c4;

    img {
      width: 200px;
      height: 250px;
    }

    p {
      padding: 5px 10px;
    }
  }

  @media (max-width: 767px) {
    .actorCard {
      margin-right: 20px;
      height: 250px;
      width: 150px;

      img {
        width: 150px;
        height: 160px;
      }
    }
  }
`;

export const Gallery = styled.section`
  width: 100%;
  height: 600px;
  margin: 20px 0;
  background-color: black;
`;

export const RecommendationsContainer = styled.section`
  width: 100%;
  margin: 30px 0;

  h1 {
    margin-bottom: 20px;
    color: white;
  }

  span {
    color: #107ee5;
  }

  .recommendation-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }

  @media (max-width: 739px) {
      .recommendation-grid {
      grid-template-columns: repeat(2, 1fr);
    }

  }

  @media(min-width: 740px) and (max-width: 1000px){
    .recommendation-grid{
      grid-template-columns: repeat(3,1fr);
    }
  }
`;
