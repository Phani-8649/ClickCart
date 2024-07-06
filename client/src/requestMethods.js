import axios from "axios";

const BASE_URL="http://localhost:5000/api/";
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzEyMmFlNGVhMjYzMzU1YzA4ZWI5ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTYzNjc3MywiZXhwIjoxNzE5ODk1OTczfQ.4D9RY32pJbizAnUw2bBuEht4GiQqNnfDWSasp2h7iFs"
export const publicRequest=axios.create({
    baseURL:BASE_URL,
});
export const UserRequest=axios.create({
    baseURL:BASE_URL,
    headers:{ token: `Bearer ${TOKEN}` },
});