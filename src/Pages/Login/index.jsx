import React, { useState } from "react";
import { LoginContainer } from "./style";
import { useHistory } from "react-router-dom";
import { Container, CommonButton } from "../../commonStyle";
import Header from "../../Components/Header";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import {motion} from 'framer-motion'

const loginVariants = {
  initial: { opacity: 0, x: -200 },
  final: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const Login = () => {
  const [nameUser, setNameUser] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const history = useHistory();

  function handleSubmit() {
    const name = nameUser.trim();
    name && password
      ? signUp
        ? dbAPI.post("/signup", { name, password }).then((response) => {
            const data = response.data;
            if (data.signup) {
              dbAPI.post("/signin", { name, password }).then((response) => {
                const data = response.data;
                auth.login(data.token);
                history.push("/");
              });
            } else alert(data.message);
          })
        : dbAPI.post("/signin", { name, password }).then((response) => {
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
        <motion.div variants={loginVariants} initial="initial" animate="final">
          <LoginContainer>
            <div className="card">
              <h1>{signUp ? "Sign up" : "Sign in"}</h1>
              <form>
                <div>
                  <p>Name:</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(event) => setNameUser(event.target.value)}
                    value={nameUser}
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
              <CommonButton onClick={handleSubmit}>
                {signUp ? "Sign up" : "Sign in"}
              </CommonButton>
              <p>
                {signUp ? "Already have an account?" : "Don't have an account?"}
                <span
                  onClick={() => {
                    signUp ? setSignUp(false) : setSignUp(true);
                  }}
                >
                  {signUp ? "Sign in" : "Sign up"}
                </span>
              </p>
            </div>
          </LoginContainer>
        </motion.div>
      </Container>
    </>
  );
};

export default Login;
