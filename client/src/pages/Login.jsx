import React, { useState } from 'react'
import styled from "styled-components"


import { mobile } from "../responsive"

import {useDispatch, useSelector} from "react-redux";
import { login } from '../redux/apiCalls';

const Container=styled.div`
  width:100vw;
  height:100vh;
  ${'' /* background:url(); */}
  display:flex;
  align-items:center;
  justify-content:center;
`;
const Wrapper=styled.div`
  padding:20px;
  width:25%;
  background-color:white;
  ${mobile({width:"75%" })}
`;
const Form=styled.form`
  display:flex;
  flex-direction:column;
`;
const Title=styled.h1`
  font-size:24px;
  font-weight:300;
`;
const Input=styled.input`
  flex:1;
  min-width:40%;
  margin:10px 0px;
  padding:10px;
`;

const Button=styled.button`
  width:40%;
  border:none;
  padding:15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
  margin-bottom:10px;
  &:disabled{
    color:green;
    cursor:not-allowed;
  }
`;

const Link=styled.a`
  margin:5px 0px;
  font-size:12px;
  text-decoration:underline;
  cursor:pointer;
`;

const Error=styled.span`
  color:red;
`;


const Login = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const dispatch=useDispatch();
  const {isFetching,error}=useSelector((state)=>state.user);

  const handleClick=(e)=>{
    e.preventDefault()
    login(dispatch,{username,password});
  }
  return (
    <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
          {/* user name passwrd  */}
            <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
            <Input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleClick} disabled={isFetching}>lOGIN</Button>
            {error && <Error>something went wrong</Error>}
            <Link>Forgot password</Link>
            <Link href="/register">Create a new account</Link>
          </Form>
        </Wrapper>
      
    </Container>
  )
}

export default Login
