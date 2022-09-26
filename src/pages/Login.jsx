import styled from "styled-components";
import {mobile} from "../responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveUser, ifUserLogged  } from "../Users.js";
import { useNavigate } from "react-router";
import { useLoadUser} from "../dataUsers";



const Login = () => {
  
  const localstg = localStorage.getItem("user") ? JSON.parse( localStorage.getItem("user")) : ''

  const [userName, setUserName] = useState(localstg && localstg.userName);
  const [password, setPassword] = useState(localstg && localstg.password);
  const {error, isLoaded, data: users } = useLoadUser();

  const navigate = useNavigate();

  const login = (e) => {

    e.preventDefault();

    if(!userName || !password){
      return alert ('User name and password are required to login')
    }

    if (!ifUserLogged()){
      const result = users.find((user) => userName === user.userName);
      const isPasswordMatch = users.find(
        (user) => password === user.password && userName === user.userName
      );
      if (!result) {
         return alert("this user name does not exist, please click the link below to complete your registration");  
      }else if (!isPasswordMatch){
        setPassword("");
        return alert("wrong password");  
      }  
      saveUser({userName,password}) 
    }
  
     navigate('/product')

  
};

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          {userName && <p style={{color:"green", fontSize: '15px', margin:'0', padding: '0', }}>Already loged in</p> }
          <Input placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} type='password'/>
          <Button onClick={login}>LOGIN</Button>
          {!userName && <Direction>DO NOT YOU REMEMBER THE PASSWORD?</Direction>}
          {!userName && <Link to={"/register"} style={{ textDecoration: 'none',}}> <Direction>CREATE A NEW ACCOUNT</Direction> </Link>}
        </Form>
      </Wrapper>
    </Container>
  );
  }

export default Login






const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/4219181/pexels-photo-4219181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid black;
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: #FF7F50;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Direction = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;