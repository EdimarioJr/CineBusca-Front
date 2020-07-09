import React from "react";
import { Container, CommonButton } from "../../commonStyle";
import { HeaderRow, InputsRow, DivSearch, WatchlistButton } from "./style";
import CineBuscaLogo from "../../assets/cinebusca.png";

const Header = () => {
  return (
    <Container>
      <HeaderRow>
        <img src={CineBuscaLogo} alt="logo cinebusca" />
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
