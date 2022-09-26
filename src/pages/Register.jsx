import styled from "styled-components";
import { mobile } from "../responsive";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router";
import { useAddUser} from "../dataUsers";




const  Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [doit,setDoit] = useState(false)
  const [payload, setPayload] = useState(null)

  const { user, isAdded, addError } = useAddUser(doit,payload);

  const navigate = useNavigate();


    function register(e){
      e.preventDefault();
    
    if (!password || !userName) {
       return alert('User name and password required')
    }

    if (password === confirmedPassword) {
     // addUser(user);
    saveUser(user)
     // navigate("/login");
     
     const pers = {
      userName,
      email,
      password,
    }

    setPayload(pers)
    setDoit(true) 
     
    } else {
      setIsPasswordHidden(false);
      setConfirmedPassword("password does not match");
    }

  };   
  
  return (

    <Container>      
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {addError && <div><p style={{color: "red"}}>{addError}</p></div>}
        {isAdded && navigate("/login")}        
        <Form onSubmit= {register}>          
          <Input placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Inputpass placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
          <Inputpass placeholder="confirm password"
          value={confirmedPassword}
          onChange={(e) => {
            if (!isPasswordHidden) {
              setIsPasswordHidden(true);
            }
            setConfirmedPassword(e.target.value);
          }}
          type={isPasswordHidden ? "password" : "text"}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" onClick={()=> setDoit(false)}>CREATE</Button>
        </Form>                
      </Wrapper>
    </Container>
  
  );
};

export default Register;

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
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
`;
const Inputpass = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  background-color: #FF7F50;
`;