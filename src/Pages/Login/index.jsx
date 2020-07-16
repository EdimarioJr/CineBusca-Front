import React, { useState} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Container, CommonButton } from "../../commonStyle";
import Header from "../../Components/Header";
import dbAPI from "../../config/dbAPI";
import auth from '../../config/auth'

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
  const history = useHistory();

  function handleSubmit() {
    console.log(name, password);
    name && password
      ? dbAPI.post("/signin", { name, password }).then((response) => {
          const data = response.data;
          if (data.signin) {
            auth.login(data.token)
            history.push("/");
          } else alert(data.message);
        })
      : alert("Preencha todos os campos!");
  }

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
            <CommonButton onClick={handleSubmit}>Sign in</CommonButton>
          </div>
        </LoginContainer>
      </Container>
    </>
  );
};

export default Login;
