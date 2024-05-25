import { Button, Card, Form, Input, InputNumber, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AddCourse = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
  const [messageApi, contextHolder] = message.useMessage();
  const [error,setError] = useState('')
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const [form] = useForm()
const token = useSelector(state=>state.Auth.token)
  const errorMessage = ()=>{
 
    messageApi.open({
      type: 'error',
      content:error,
    });
  
  };
 
    const onFinish = async(values) => {
        // console.log("Success:", values);
    await axios.post(`${BASE_URL}/courses/add_course`,values,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      console.log(res)
      messageApi.open({
        type: 'success',
        content:'Course added successfully',
      });
     form.resetFields()
    }).catch((err)=>{console.log(err.response)
      setError( err.response.data.message)
    
      errorMessage();
    })
    
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
      return (
       <div style={{height:'',display:'flex',justifyContent:'center',alignItems:'center'}}>
    {contextHolder}
    
         <Card style={{maxWidth:'400px',minWidth:'350px',width:'100%'}}  title='Add Course'
       >
          <Form
            name="basic"
            form={form}
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
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input  name!",
                },
              
              ]}
            >
              <Input />
            </Form.Item>
    
            <Form.Item
              label="Fees"
              name="fees"
              rules={[
                {
                  required: true,
                  message: "Please input  fees!",
                },
              
              ]}
            >
              <InputNumber style={{width:'100%'}} />
            </Form.Item>
            
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input  description!",
                },
              
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
             
            >
              <Button style={{width:'100%'}} type="primary" htmlType="submit">
                Add Course
              </Button>
            </Form.Item>
          </Form>
        </Card>
        
       </div>
      );
}

export default AddCourse
