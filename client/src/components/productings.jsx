import React, { useEffect, useState } from 'react';
import styled from "styled-components";
// import { categories } from '../data';
import Producting from './Producting';

import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap:wrap;
  justify-content:space-between;
`;

const Productings = ({cat,filters,sort}) => {
  const [products,setProducts]=useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);

  useEffect(()=>{
    const getProducts=async()=>{
      try{
        const res=await axios.get( cat ? `http://localhost:5000/api/Products?category=${cat}` : "http://localhost:5000/api/Products");
        setProducts(res.data);
      }catch(err){
        console.log(err);
      };
    };
    getProducts()
  },[cat]);

  // if any change categories(dependency) the use effect function will be activated

  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter((item)=>Object.entries(filters).every(([key,value])=>
      item[key].includes(value)))
    )
  },[products,cat,filters]);

  useEffect(()=>{
    if(sort==="newest"){
      setFilteredProducts((prev)=>
        [...prev].sort((a,b)=>a.createdAt - b.createdAt)
        // [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      )
    }
    else if(sort==="asc"){
      setFilteredProducts((prev)=>
        [...prev].sort((a,b)=>a.price-b.price)
      )
    }
    else{
      setFilteredProducts((prev)=>
        [...prev].sort((a,b)=>b.price-a.price)
      )
    }
  },[sort]);


  return (
    <Container>
      {filteredProducts && filteredProducts.length > 0
        ? filteredProducts.map((item) => <Producting item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Producting item={item} key={item._id} />)}
    </Container>
  );
};

export default Productings;
