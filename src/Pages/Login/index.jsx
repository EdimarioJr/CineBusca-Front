import React, { useState } from "react";
import { LoginContainer } from "./style";
import { useHistory } from "react-router-dom";
import { Container, CommonButton } from "../../commonStyle";
import Header from "../../Components/Header";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit() {
    const nameTrim = name.trim();
    name && password
      ? dbAPI.post("/signin", { nameTrim, password }).then((response) => {
          const data = response.data;
          if (data.signin) {
            auth.login(data.token);
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
