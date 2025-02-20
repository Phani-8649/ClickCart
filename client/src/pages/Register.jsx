import React from 'react'
import styled from "styled-components"
import { userRequest } from '../requestMethods';
import { mobile } from "../responsive"
import { useState } from 'react';
// import { notify } from '../../../server/routes/auth';
import { notifySuccess, notifyFailure,notifyInfo } from "../components/alert";

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
    width:40%;
    background-color:white;
    ${mobile({width:"75%" })}
`;
const Form=styled.form`
    display:flex;
    flex-wrap:wrap;
`;
const Title=styled.h1`
    font-size:24px;
    font-weight:300;
`;
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin:20px 10px 0px 0px;
    padding:10px;
`;
const Agreement=styled.span`
    font-size:12px;
    margin:20px 0px;
`;
const Button=styled.button`
    width:40%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
`;
const Register = () => {

    // connecting to the backend
    const [userData,setUserdata]=useState({});
    const verifyForm=(obj)=>{
        const len=Object.keys(obj).length;
        for (var key in obj){
            if(obj[key==null ||obj[key]==="" ||len<6]){
                return false;
            }
            return true;
        }
    }
    // checked the basic condition 
    // now coding for handling the change in the input 
    const changeHandler=(e)=>{
        setUserdata((prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value,

            };
        });
    };

    // now coding for the button 

    const submitHandler=async(event)=>{
        event.preventDefault();
        try{
            let verify=verifyForm(userData);
            if(verify){
                const res=await userRequest.post("auth/register",userData);
                res && notifySuccess("Successfully registered");
            }
            else{
                notifyInfo("Fill all the details");
            }
        }catch(err){
            notifyFailure(err);
        }
    };
    // add these functions to the input to post them to the backend 
  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form>
            <Input placeholder="name" name="name" onChange={changeHandler}/>
            <Input placeholder="Last name" name="last name" onChange={changeHandler}/>
            <Input placeholder="user name" name="username" onChange={changeHandler}/>
            <Input placeholder="email" name="email" onChange={changeHandler}/>
            <Input placeholder="passwrd" name="password" onChange={changeHandler}/>
            <Input placeholder="confirm password" name="confirm password" onChange={changeHandler}/>
            <Agreement>
                By creating an account,I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b> 
            </Agreement>
            <Button onClick={submitHandler}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
