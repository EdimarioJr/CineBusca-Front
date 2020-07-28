import React from "react";
import styled from "styled-components";
import movieApiLogo from "../../assets/movieDBlogo.svg";

const FooterContainer = styled.section`
  height: 130px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  background-color: #383d48;

  p {
    color: white;
    margin-right: 30px;
  }

  a {
    text-decoration: none;
    text-underline-position: none;
    font-weight: 700;
    color: white;
  }

  img {
    width: 100px;
    height: 100px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Made by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/EdimarioJr"
        >
          edimario
        </a>
      </p>
      <img src={movieApiLogo} alt="Movie Db Api Logo" />
    </FooterContainer>
  );
};

export default Footer;
