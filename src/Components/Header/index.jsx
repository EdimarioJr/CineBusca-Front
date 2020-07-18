import React, { useState } from "react";
import { Container, CommonButton } from "../../commonStyle";
import { HeaderRow, InputsRow, DivSearch, WatchlistButton } from "./style";
import { Link } from "react-router-dom";
import CineBuscaLogo from "../../assets/cinebusca.png";
import auth from "../../services/auth";
import {useHistory} from 'react-router-dom'

const Header = () => {
  const [loginOn, setLoginOn] = useState(auth.isAuthenticated());
  const [search,setSearch] = useState('')
  const history = useHistory()

  function handleChange(event){
    setSearch(event.target.value)
  }

  function submitSearch(){
    if(search){
      history.push({
        pathname: "/search",
        search: search
      })
    } else alert("The search is empty!")
  }

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
            <input type="text" placeholder="Search by film title" value={search} onChange={handleChange} />
            <button onClick={submitSearch}>Go!</button>
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
