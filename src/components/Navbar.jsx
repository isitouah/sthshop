import { Badge} from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Login from "../pages/Login";
import register from "../pages/Register"
import { Link } from "react-router-dom";


import "./style/navbar.css";




const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Center>
          <Logo >STH Shop</Logo>
        </Center>
        <Right>
        <Link to={'/register'} style={{textDecoration: 'none'}}><MenuItem>Register</MenuItem></Link>
        <Link to={'/login'} style={{textDecoration: 'none'}}><MenuItem>Login</MenuItem></Link>
        
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 70px;
  ${mobile({ height: "50px" })}
  background-color: #FF7F50;
`;

const Wrapper = styled.div`
  color: white;
  padding: 10px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;


const Center = styled.div`
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color:white;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-weight: normal
  background-color: #FF7F50;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
export default Navbar;


