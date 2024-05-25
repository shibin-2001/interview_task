import { Button, Card, Form, Input, message } from "antd";
import axios, { Axios, AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setLogin } from "./reducer/AuthReducer";


const LoginPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const [messageApi, contextHolder] = message.useMessage();
  const [error,setError] = useState('')
  const dispatch =useDispatch();
  const navigate = useNavigate();
  // const isAuthenticated= useSelector(state=>state)
  // console.log(isAuthenticated)
// console.log(contextHolder)
  // useEffect(()=>{
  //   isAuthenticated && navigate('/home')
  // },[])

  const errorMessage = ()=>{
 
    messageApi.open({
      type: 'error',
      content:error,
    });
  
  };

  const onFinish = async(values) => {
    // console.log("Success:", values);
await axios.post(`${BASE_URL}/login`,values)
.then((res)=>{
  console.log(res)
   dispatch(setLogin(res.data))
 
   navigate('/add_course',{state:{loginMessage:'success'}})
}).catch((err)=>{console.log(err.response)
  setError( err.response.data.message)

  errorMessage();
})

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
   <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
{contextHolder}

     <Card style={{maxWidth:'400px',minWidth:'350px',width:'100%'}}  title='Login Form'
   >
      <Form
        name="basic"
        labelCol={{span:24}}
        requiredMark={false}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
                type:"email",
                message: "Please enter valid email!",
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
         
        >
          <Button style={{width:'100%'}} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Link to={'/register'}>Don't Have an account ? SignUp</Link>
    </Card>
    
   </div>
  );
};

export default LoginPage;
