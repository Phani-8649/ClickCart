import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom';
import { mobile } from "../responsive"

const Container=styled.div`
    flex:1;
    margin:3px;
    height:70vh;
    position:relative;
    ${mobile({height:"20vh" })}
`;
const Image=styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`;
const Info=styled.div`
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    ${'' /* background-color:yellow */}
`;
const Title=styled.h1`
    font-color:white;
    margin-bottom:20px;
`;
const Button=styled.button`
    border:none;
    padding:10px;
    background-color:white;
    color:gray;
    cursor:pointer;
    font-weight:600;
`;
const CategoryItem = ({item}) => {
  return (
    <Container>
    <Link to={`/products/${item.cat}`}>
      <Image src={item.img}/>
      <Info>
        <Title>{item.title}</Title>
        <Button>Shop Now</Button>
      </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem
