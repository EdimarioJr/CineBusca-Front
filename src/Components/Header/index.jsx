import React, { useState } from "react";
import { Container, CommonButton } from "../../commonStyle";
import { HeaderRow, InputsRow, UserNav } from "./style";
import { Link } from "react-router-dom";
import CineBuscaLogo from "../../assets/cinebusca.png";
import auth from "../../services/auth";
import SearchInput from "./SearchInput";
import { motion, AnimatePresence } from "framer-motion";

const Header = (props) => {
  const [loginOn, setLoginOn] = useState(auth.isAuthenticated());

  function handleLogout() {
    auth.logout();
    setLoginOn(false);
  }

  return (
    <Container>
      <HeaderRow>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={CineBuscaLogo} alt="logo cinebusca" />
        </Link>
        <InputsRow>
          <SearchInput />
          {loginOn ? (
            <CommonButton onClick={handleLogout}>LOGOUT</CommonButton>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <CommonButton>SIGN IN</CommonButton>
            </Link>
          )}
        </InputsRow>
      </HeaderRow>

      <AnimatePresence>
        {loginOn && (
          <UserNav
            key="nav"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            watchlist={props.watchlist}
            review={props.review}
          >
            <Link to="/watchlist" style={{ textDecoration: "none" }}>
              <motion.h3 id="watch">WATCHLIST</motion.h3>
            </Link>
            <Link to="/reviews" style={{ textDecoration: "none" }}>
              <motion.h3 id="review">REVIEWS</motion.h3>
            </Link>
          </UserNav>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Header;
