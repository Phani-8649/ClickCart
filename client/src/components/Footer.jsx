import { Facebook, Instagram, MailLockOutlined, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'
import React from 'react'
import styled from "styled-components"

import { mobile } from "../responsive"

const Container=styled.div`
    display:flex;
    ${mobile({flexDirection:"column" })}
`
const Left=styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`
const Logo=styled.h1`
    margin:20px 0px;
`;
const Desc=styled.p`

`;
const SocialContainer=styled.div`
    display:flex;
`;
const SocialIcon=styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color:#${(props)=>props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`;
const Center=styled.div`
    flex:1;
    padding:20px;
    ${mobile({display:"none" })}
`
const Right=styled.div`
    flex:1;
    padding:20px;
    ${mobile({backgroundColor:"#fff8f8" })}
`;
const Title=styled.h3`
    margin-bottom:30px
`;
const List=styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap
`;
const ListItem=styled.li`
    width:50%;
    margin-bottom:10px;
`;

const ContactItem=styled.div`
    margin-bottom:20px;
    display:flex;
    align-items:center;
`;
const Payment=styled.img`  
    width:50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Lama.</Logo>
        <Desc>
            Consequat excepteur eiusmod qui eiusmod officia nisi. Dolor aliqua proident incididunt sit commodo veniam magna qui ea mollit qui. Occaecat nostrud incididunt sunt eu enim enim quis exercitation. Ullamco sunt sunt non officia.
        </Desc>
        <SocialContainer>
            <SocialIcon color="385999">
                <Facebook/>
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram/>
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <Twitter/>
            </SocialIcon>
            <SocialIcon color="E60023">
                <Pinterest/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My account</ListItem>
            <ListItem>order Tacking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem><Room style={{marginRight:"10px"}}/>622 Dixie path,south tobinchester 98336</ContactItem>
        <ContactItem><Phone style={{marginRight:"10px"}}/>7013321122</ContactItem>
        <ContactItem><MailLockOutlined style={{marginRight:"10px"}}/>saiphanindrachalla@gmail.com </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
      </Right>
    </Container>
  )
}

export default Footer
