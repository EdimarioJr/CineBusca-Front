import React from "react";
import { Container, CommonButton } from "../../commonStyle";
import { HeaderRow, InputsRow, DivSearch, WatchlistButton } from "./style";
import { Link } from "react-router-dom";
import CineBuscaLogo from "../../assets/cinebusca.png";
import auth from "../../config/auth";

const Header = () => {
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
          <WatchlistButton>WATCH</WatchlistButton>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <CommonButton>SIGN IN</CommonButton>
            {auth.isAuthenticated() ? (
              <CommonButton onClick={auth.logout}>LogOut</CommonButton>
            ) : (
              ""
            )}
          </Link>
        </InputsRow>
      </HeaderRow>
    </Container>
  );
};

export default Header;
