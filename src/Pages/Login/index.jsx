import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, CommonButton } from "../../commonStyle";
import Header from "../../Components/Header";

const LoginContainer = styled.main`
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
  }
`;

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header />
      <Container>
        <LoginContainer>
          <div className="card">
            <h1>Sign in</h1>
            <form>
              <div>
                <p>Name:</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
              </div>
              <div>
                <p>Password:</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </div>
            </form>
            <CommonButton>Sign in</CommonButton>
          </div>
        </LoginContainer>
      </Container>
    </>
  );
};

export default Login;
