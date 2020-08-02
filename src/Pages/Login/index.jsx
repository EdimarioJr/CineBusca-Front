import React, { useState } from "react";
import { LoginContainer } from "./style";
import { useHistory } from "react-router-dom";
import { ContainerPages, CommonButton } from "../../commonStyle";
import Header from "../../Components/Header";
import dbAPI from "../../services/dbAPI";
import auth from "../../services/auth";
import { motion } from "framer-motion";
import Footer from '../../Components/Footer'

// login Animation
const loginVariants = {
  initial: { opacity: 0, x: -200 },
  final: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const history = useHistory();

  function handleSubmit() {
    const name = username.trim();
    // will only try to do the sign in/sign up if the the user fill the two inputs
    name && password
      ? signUp
        ? dbAPI.post("/signup", { name, password }).then((response) => {
            const data = response.data;
            if (data.signup) {
              // when the signup is successful, will login and redirect to home automatically
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
      <ContainerPages style={{minHeight: 'calc(100vh - 278px)'}}>
        <motion.div variants={loginVariants} initial="initial" animate="final">
          <LoginContainer>
            <div className="card">
              <h1>{signUp ? "Sign up" : "Sign in"}</h1>
              <form>
                <div>
                  <p>Name:</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Name"
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
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
              <CommonButton className="signButton" onClick={handleSubmit}>
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
      </ContainerPages>
      <Footer/>
    </>
  );
};

export default Login;
