import React, { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
const RegistrationPage = () => {
  const BASE_URL=process.env.REACT_APP_BASE_URL
  const[file,setFile] = useState({})
  const [urls,setUrls] = useState([])
  const navigate = useNavigate();
  const onFinish = async(values) => {
    // console.log(urls)
    // console.log("Success:", values);
    values["picturePath"] = urls
    // console.log("Success:", values);
    const response = await axios.post(`${BASE_URL}auth/register`,values)
    // console.log(response)
    navigate('/')
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const uploadHandler = async(e)=>{
    setFile(e.file);
    console.log(file)
    const formData = new FormData();
    
    
      formData.append("picture", file.originFileObj);
  //  console.log(formData)
    await fetch(`${BASE_URL}upload`, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setUrls(result.fileUrls)
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <div
      style={{
        height: "100vh",
        overflow:'auto',
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
   
      }}
    >
   <div style={{maxWidth:'400px',minWidth:'350px',width:'100%'}}>
   <Card 
   title='Registration Form'
   >
        <Form
          name="basic"
          requiredMark={false}
         labelCol={{span:24}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
        
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter valid email!",
              },
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
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password />
            </Form.Item>
          
          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/"}>Already Have an account ? Sign In</Link>
      </Card>
   </div>
    </div>
  );
};

export default RegistrationPage;
