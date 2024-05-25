import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Modal, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { setCourses } from "./reducer/StudentReducer";

const data = [
  {
    id: "1",
    name: "John Brown",
    fees: 32,
    description: "New York No. 1 Lake Park, New York No. 1 Lake Park",
  },
  {
    id: "2",
    name: "Jim Green",
    fees: 42,
    description: "London No. 2 Lake Park, London No. 2 Lake Park",
  },
  {
    id: "3",
    name: "Joe Black",
    fees: 32,
    description: "Sydney No. 1 Lake Park, Sydney No. 1 Lake Park",
  },
];
const ViewCourse = () => {
    const token = useSelector(state=>state.Auth.token)
    const [form] = useForm()
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const[modalData,setModalData] = useState({})
    const[modalEditOpen,setModalEditOpen] = useState(false)
    const dispatch = useDispatch()
const data = useSelector(state=>state.Student.courses)
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

    const onFinish = async(values) => {
        // console.log("Success:", values);
    await axios.post(`${BASE_URL}/courses/update_course/${modalData.id}`,values,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      console.log(res)
      setModalData({})
      modalEditOpen(false)
      dispatch(setCourses(res.data))
    }).catch((err)=>{console.log(err.response)
    
    })
    
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
    const handleDelete = async(row)=>{
        await axios.post(`${BASE_URL}/courses/delete_course/${row.id}`,{},{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
          console.log(res)
          setModalData({})
          dispatch(setCourses(res.data))
        }).catch((err)=>{console.log(err.response)
        
        })
    }
    const handleUpdate = (row)=>{
        setModalData(row)
        form.setFieldsValue(row)
        setModalEditOpen(true)
    }
   
    const handleCloseEdit =()=>{
        setModalEditOpen(false)
    }
    const columns = [
        {
          title: "Course Nme",
          dataIndex: "name",
          key: "name",
        
        },
        {
          title: "Fees",
          dataIndex: "fees",
          key: "fees",
         
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: {
              showTitle: false,
            },
            render: (desc) => (
              <Tooltip placement="topLeft" title={desc}>
                {desc}
              </Tooltip>
            ),
          },
          {
            title: "Action",
           render:(row)=>{
            console.log(row)
            return <>
         
            <Button type="text" style={{color:"#008000"}} onClick={()=>{handleUpdate(row)}}><EditOutlined /></Button>
            <Button type="text" danger onClick={()=>{handleDelete(row)}}> <DeleteOutlined/></Button>
            </>
           }
           
          },
      ];
  return (
<>
<Card>
      <Table columns={columns} rowKey={'id'} dataSource={data} />
    </Card>
  
   <Modal title="Edit Course" open={modalEditOpen} footer={null} onCancel={handleCloseEdit}>
   <Form
   form={form}
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
                Update Course
              </Button>
            </Form.Item>
          </Form>
   </Modal>
   </>
  );
};
export default ViewCourse;
