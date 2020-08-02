import styled from "styled-components";

export const LoginContainer = styled.main`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card {
    color: white;
    height: 600px;
    background-color: #383d48;
    display: flex;
    flex-direction: column;
    width: 500px;
    align-items: center;
    justify-content: center;

    .signButton{
      padding: 20px 30px;
    }

    div {
      margin-bottom: 20px;
    }

    h1 {
      margin-bottom: 40px;
    }

    form {
      margin-bottom: 30px;
      width: 70%;
    }

    input {
      width: 100%;
      padding: 10px 0;
      padding-left: 10px;
    }

    p{
      margin-top: 25px;
    }
    span {
      color: #107ee5;
      margin-left: 10px;
      cursor:pointer;
    }

  }

  @media(max-width: 475px){
    .card{
      width: 350px;
      height: 400px;

      form{
        width: 80%;
      }

      .signButton{
        padding: 20px;
      }
    }
  }

  @media(min-width: 476px) and (max-width: 538px){
    .card{
      width: 420px;
    }
  }
`;
