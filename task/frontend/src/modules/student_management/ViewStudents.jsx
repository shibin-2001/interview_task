import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Table,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { setStudents } from "./reducer/StudentReducer";

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
const ViewStudents = () => {
  const token = useSelector((state) => state.Auth.token);
  const [form] = useForm();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [modalData, setModalData] = useState({});
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.Student.courses);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    let ordered = course && course.map((obj) => {
      return { value: obj.id, label: obj.name };
    });
    setOptions(ordered);
  }, [course]);
  const data = useSelector((state) => state.Student.students);
  console.log(data);
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    await axios
      .get(`${BASE_URL}/student/get_student`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        dispatch(setStudents(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    let datapack = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      courseId: values.course,
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
      },
    };
    await axios
      .post(`${BASE_URL}/student/update_student/${modalData.id}`, datapack, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setModalEditOpen(false);
        setModalData({});

        dispatch(setStudents(res.data));

        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleDelete = async (row) => {
    await axios
      .post(
        `${BASE_URL}/student/delete_student/${row.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        setModalData({});
        dispatch(setStudents(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleUpdate = (row) => {
    setModalData(row);
    let { address } = row;
    let data = { ...row, ...address, course: row.courseId };
    form.setFieldsValue(data);
    setModalEditOpen(true);
  };
const handleActive=async(e,id)=>{
  await axios
  .post(
    `${BASE_URL}/student/set_active/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  .then((res) => {
    console.log(res);
    
    dispatch(setStudents(res.data));
  })
  .catch((err) => {
    console.log(err.response);
  });
}
  const handleCloseEdit = () => {
    setModalEditOpen(false);
  };
  const columns = [
    {
      title: "Nme",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
    title: "Active Status",
    dataIndex: "isActive",
    key: "isActive",
    render:(active,row)=><Switch onClick={(e)=>handleActive(e,row.id)} checked={active} />
  },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render:(course)=>course.name
    },
    {
      title: "Action",
      render: (row) => {
        console.log(row);
        return (
          <>
            <Button
              type="text"
              style={{ color: "#008000" }}
              onClick={() => {
                handleUpdate(row);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              type="text"
              danger
              onClick={() => {
                handleDelete(row);
              }}
            >
              {" "}
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Card>
        <Table columns={columns} rowKey={"id"} dataSource={data} />
      </Card>

      <Modal
        title="Edit Student"
        open={modalEditOpen}
        footer={null}
        onCancel={handleCloseEdit}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 24 }}
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
                type: "email",
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
            <InputNumber style={{ width: "100%" }} />
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
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
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
          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Add Student
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ViewStudents;
