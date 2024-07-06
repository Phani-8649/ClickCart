import React, { useState } from 'react'
import styled from "styled-components"

import { mobile } from "../responsive"

import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { sliderItems } from '../data';
const Conatiner=styled.div`
    width:100%;
    height:100vh;
    display:flex;
    position:relative;
    overflow:hidden;
    ${mobile({display:"none" })}
`;
const Arrow=styled.div`
    width:50px;
    height:50px;
    background-color:"#fff7f7";
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
    left:${props => props.direction==="left"&&"10px"};
    right:${props => props.direction==="Right"&&"10px"};
    cursor:pointer;
    opacity:0.5;
    z-index:2;
`;

const Wrapper=styled.div`
    justify-content:center;
    display:flex;
    transform:translateX(${props=>props.slideIndex*-100}vw);
    transition:all 1.5s ease;
`;
const Slide=styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items:center;
    background-color:#${props=>props.bg};
`;
const Imagecontainer=styled.div`
    ${'' /* flex:1;  */}
    height:100%;   
`;
const Image=styled.img`
    height:80%;
`
const InfoContainer=styled.div`
    ${'' /* flex:1;
    padding:50px;  */}
`;
const Title=styled.h1`
    font-size:70px;    
`;
const Desc=styled.p`
    margin:50px 0px;
    font-size:20px;
    font-weight:500;
    letter-spacing:3px;
`;
const Button=styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer;
`;

const Slider = () => {
    const [slideIndex,setSlideIndex]=useState(0);
    const handleClick=(direction)=>{
        if(direction==="left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        }
        else{
            setSlideIndex(slideIndex  <  2  ?  slideIndex + 1 : 0);
        }
    };
  return (
    <Conatiner>
      <Arrow direction="left" onClick={()=>handleClick("left")}>
        <ArrowLeft/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
      {sliderItems.map((item)=>(
        <Slide bg={item.bg} key={item.id}>
            <Imagecontainer>
                <Image src={item.img}/>
            </Imagecontainer>
            <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>Shop Now</Button>
            </InfoContainer>
        </Slide>
        ))}
      </Wrapper>
      <Arrow direction="Right" onClick={()=>handleClick("right")}>
        <ArrowRight/>   
      </Arrow>
    </Conatiner>
  )
}

export default Slider
