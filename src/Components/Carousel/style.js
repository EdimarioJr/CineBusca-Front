import styled from "styled-components";

export const DivCarousel = styled.div`
  width: 100%;
  height: 600px;

  h1 {
    margin: 20px 0;
  }

  img {
    height: 600px;
  }

  @media(max-width: 475px){
    height: 400px;

    img{
      height: 400px;
    }
  }
`;