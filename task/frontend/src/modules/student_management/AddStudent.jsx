import { Button, Card, Form, Input, InputNumber, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCourses } from "./reducer/StudentReducer";

const AddStudent = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
  const [messageApi, contextHolder] = message.useMessage();
  const [error,setError] = useState('')
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const [form] = useForm()
  const data = useSelector(state=>state.Student.courses)
  const[options,setOptions] = useState([])
  useEffect(()=>{
let ordered = data && data.map((obj)=>{
    return{value:obj.id,label:obj.name}
})
setOptions(ordered)
  },[data])
  console.log(data)
      useEffect(()=>{
          fetchCourses()
      },[])
  const fetchCourses = async()=>{
      await axios.get(`${BASE_URL}/courses/get_course`,{headers:{Authorization:`Bearer ${token}`}})
      .then((res)=>{
        console.log(res)
       dispatch(setCourses(res.data))
       
      }).catch((err)=>{console.log(err.response)
      
      })
  }
  
const token = useSelector(state=>state.Auth.token)
  const errorMessage = ()=>{
 
    messageApi.open({
      type: 'error',
      content:error,
    });
  
  };
 
    const onFinish = async(values) => {
        console.log("Success:", values);
        let datapack = {
            name:values.name,
            email:values.email,
            phone:values.phone,
            courseId:values.course,
            address: {
       
                street: values.street,
                city: values.city,
                state: values.state,
                zip: values.zip
              
            },
            
        }
    await axios.post(`${BASE_URL}/student/add_student`,datapack,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      console.log(res)
      messageApi.open({
        type: 'success',
        content:'Student added successfully',
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
    
         <Card style={{maxWidth:'400px',minWidth:'350px',width:'100%'}}  title='Add Student'
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input  email!",
                },
                {
                    type: 'email',
                    message: "Please enter valid  email!",
                  },
              
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input  phone!",
                },
               
              
              ]}
            >
              <InputNumber style={{width:'100%'}} />
            </Form.Item>
            <Form.Item
              label="course"
              name="course"
              rules={[
                {
                  required: true,
                  message: "Please input  course!",
                },
              
              ]}
            >
             <Select
    showSearch
  
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={options}
  />
            </Form.Item>
            <Form.Item
              label="street"
              name="street"
              rules={[
                {
                  required: true,
                  message: "Please input  street!",
                },
              
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="city"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input  city!",
                },
              
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="state"
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please input  state!",
                },
              
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="zip"
              name="zip"
              rules={[
                {
                  required: true,
                  message: "Please input  zip!",
                },
              
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
             
            >
              <Button style={{width:'100%'}} type="primary" htmlType="submit">
                Add Student
              </Button>
            </Form.Item>
          </Form>
        </Card>
        
       </div>
      );
}

export default AddStudent
