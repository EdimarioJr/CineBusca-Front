import React from "react";
import { Container, CommonButton } from "../../commonStyle";
import { HeaderRow, InputsRow, DivSearch, WatchlistButton } from "./style";
import { Link } from "react-router-dom";
import CineBuscaLogo from "../../assets/cinebusca.png";

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
          <CommonButton>SIGN IN</CommonButton>
        </InputsRow>
      </HeaderRow>
    </Container>
  );
};

export default Header;
