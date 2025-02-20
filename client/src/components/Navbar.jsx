import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from "../responsive"

import Search from '@mui/icons-material/Search';
// import Badge from '@mui/icons-material/Badge';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
// import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import Badge from '@mui/material/Badge';
import { ShoppingCartOutlined } from '@mui/icons-material';
import {useSelector} from "react-redux"
const Container=styled.div`
    height:60px;
    ${mobile({height:"50px" })}
`;
const Wrapper=styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    align:center;
    ${mobile({padding:"10px 0px " })}
`;
const Left=styled.div`
    flex:1;
    display:flex;
    align:center;
`;
const Language=styled.div`
    font-size:14px;
    cursor:pointer;
    padding:2%;
    ${mobile({display:"none" })}
`;
const SearchContainer=styled.div`
    border:0.5px solid lightgray;
    display:flex;
    align:center;
    margin-left:25px;
    padding:5px;
`;
const Input=styled.input`
    border:none;
    ${mobile({width:"50px" })}
`;
const Center=styled.div`
    flex:1;
    text-align:center;
`;
const Logo=styled.h1`
    font-weight:bold;
    ${mobile({fontSize:"24px" })}
`;
const Right=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    ${mobile({flex:2,justifyContent:"center" })}
    
`;
const MenuItem=styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    ${mobile({fontSize:"12px" ,marginLeft:"10px"})}
`

const Navbar = () => {
    const quantity=useSelector(state=>state.cart.quantity);
    // console.log(quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
            <Language>EN</Language>
            <SearchContainer>
                <Input placeholder="search"/>
                <Search style={{color:"grey",fontSize:16}}/>
            </SearchContainer></Left>
        <Center><Logo>phani</Logo></Center>
        <Right>
            <MenuItem>
                <Link to="/register">Register</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/login">signin</Link>
            </MenuItem>
            <Link to="/cart">
                <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined/>
                </Badge>
                </MenuItem>
            </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
