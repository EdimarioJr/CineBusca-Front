import React, { useState } from "react";
import { Container, CommonButton } from "../../commonStyle";
import { HeaderRow, InputsRow, DivSearch, WatchlistButton } from "./style";
import { Link } from "react-router-dom";
import CineBuscaLogo from "../../assets/cinebusca.png";
import auth from "../../config/auth";

const Header = () => {
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
          <DivSearch>
            <input type="text" placeholder="Search by film title" />
            <button>Go!</button>
          </DivSearch>
          {loginOn ? (
            <Link to="/watchlist" style={{ textDecoration: "none" }}>
              <WatchlistButton>WATCH</WatchlistButton>
            </Link>
          ) : (
            ""
          )}

          {loginOn ? (
            <CommonButton onClick={handleLogout}>LOGOUT</CommonButton>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <CommonButton>SIGN IN</CommonButton>
            </Link>
          )}
        </InputsRow>
      </HeaderRow>
    </Container>
  );
};

export default Header;
