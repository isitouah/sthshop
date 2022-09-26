import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";
import {addProduct} from "../redux/cartRedux"
import { useDispatch } from "react-redux";
import Navbarprod from "../components/Navbarprod";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  height: 80%;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;


const AddContainer = styled.div`
  margin-top: 10rem;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #FF4500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #ff7f50b0;
  background-color: white;
  color: black;
  cursor: pointer;
  border-radius: 25px;
  font-weight: 500;
  &:hover{
    color: black;
      background-color: #f8f4f4;
  }
`;



const Productinfo = () => {

  const location = useLocation();
  const data = location.state
  const [quantity , setQantity] = useState(1);

  const handleQuantity = (type) =>{
    if(type === "dec"){
      quantity > 1 && setQantity(quantity - 1)
    }else{
      setQantity(quantity + 1)
    }
  }

  const dispatch = useDispatch();

  const handleClick = ()=>{
    dispatch(
      addProduct({ product:data, quantity, total:parseFloat(data.price)*quantity})
      );
  }

  return (
    <Container>
      <Navbarprod />
      <Wrapper>
        <ImgContainer>
          <Image src={data.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{data.titre}</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </Desc>
          <Price>{data.price}</Price>
          
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity("inc")}  />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Productinfo;