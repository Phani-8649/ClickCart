import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcements"
import styled from "styled-components"
import Footer from '../components/Footer'
import { Add, Remove } from '@mui/icons-material'

// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { mobile } from "../responsive"
import { useSelector } from 'react-redux'


import StripeCheckout from "react-stripe-checkout";

import {userRequest} from "../requestMethods"

const KEY=process.env.REACT_APP_STRIPE;
// console.log(KEY);


const Container=styled.div`

`;
const Wrapper=styled.div`
    padding:20px;
    ${mobile({padding:"10px"})}
`;
const Title=styled.h1`
    font-weight:300;
    text-align:center;
`;
const Top=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`;

const TopButton=styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border:${props=>props.type==="filled"&&"none"};
    background-color:${props=>props.type==="filled"? "black" :"transparent"};
    color:${props=>props.type==="filled"&&"white"};
`;
const TopTexts=styled.div`
    ${mobile({display:"none"})}
`;

const TopText=styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`;
const Bottom=styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({flexDirection:"Column"})}
`;

const Info=styled.div`
    flex:3;
`;
const Summary=styled.div`
    flex:1;
    border:0.5px solid lightgray;
    bordder-radius:10px;
    padding:20px;
    height:50vh;
`;


const Product=styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({flexDirection:"Column"})}
`;
const ProductDetails=styled.div`
    flex:2;
    display:flex;
`;
const Image=styled.img`
    width:200px;

`;
const Details=styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName=styled.span``;
const ProductId=styled.span``;
const ProductColor=styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${(props)=>props.color}
`;
const ProductSize=styled.span``;
const PriceDetails=styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;


const ProductAmountContainer=styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
`;
const ProductAmount=styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({margin:"5px 15px"})}
`;
const ProductPrice=styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile({marginBottom:"20px"})}
`;

const Hr=styled.hr`
    background-color:#eee;
    border:none;
    height:1px;
`;

const SummaryTitle=styled.h1`
    font-weight:200;
`;
const SummaryItem=styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight:${props=>props.type==="total"&&"500"};
    font-size:${props=>props.type==="total"&&"24px"};
`;
const SummaryItemText=styled.span``;
const SummaryItemPrice=styled.span``;
const Button=styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight:600;
`;


const Cart = () => {
    // for shopping cart dynamicness 
    const shoppingBagCount = useSelector((state) => state.cart.quantity);
    
    // add wishlist also 

    const cart=useSelector(state=>state.cart);
    
    const [stripeToken,setStripeToken]=useState(null);

    // const history=useHistory();
    const navigate = useNavigate();


    const onToken=(token)=>{
        setStripeToken(token);
    };
    useEffect(()=>{
        const makeRequest=async()=>{
            try{
                const res=await userRequest.post("/checkout/payment",{
                    tokenId:stripeToken.id,
                    // amount:cart.total*100,
                    amount:500,
                });
                navigate('/success',{
                    state:{
                        data:res.data,
                    }
                });
            }
            catch{

            }
        };
        stripeToken && makeRequest();
        // iff stripetoken exists 
    },[stripeToken,cart.total,navigate])
  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
            <Link to="/">
                <TopButton>Continue Shopping</TopButton>
            </Link>
            <TopTexts>
                {/* <TopText>shopping bag(2)</TopText> */}
                <TopText>shopping bag({shoppingBagCount})</TopText> 
                <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <TopButton type="filled">Check out now</TopButton>
        </Top>
        <Bottom>
            <Info>
            {cart.products.map((product)=>(
                <Product>
                    <ProductDetails>
                    <Image src={product.img}/>
                    <Details>
                        <ProductName><b>Product:</b>{product.title}</ProductName>
                        <ProductId><b>ID:</b>{product._id}</ProductId>
                        <ProductColor color={product.color}/>
                        <ProductSize><b>Size:</b>{product.size}</ProductSize>
                    </Details>
                    </ProductDetails>
                    <PriceDetails>
                        <ProductAmountContainer>
                            <Add/>
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <Remove/>
                        </ProductAmountContainer>
                        <ProductPrice>${product.price*product.quantity}</ProductPrice>
                    </PriceDetails>
                </Product>
            ))}
                <Hr/>
            </Info>
            <Summary>
                <SummaryTitle>Order Summary</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>-$5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                    <SummaryItemText >Total</SummaryItemText>
                    <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout
                    name="Lama Shop"
                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                    billingAddress
                    shippingAddress
                    description={`Your total is $${cart.total}`}
                    amount={cart.total * 100}
                    token={onToken}
                    stripeKey={KEY}
                >
                    <Button>CHECKOUT NOW</Button>
                </StripeCheckout>
            </Summary>
        </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart
