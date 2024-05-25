import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../Auth/reducer/AuthReducer';
const { Header, Sider, Content } = Layout;
const MasterLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  let path = useLocation().pathname.split('/')[1];
  // console.log(path)
  return (
    <Layout style={{minHeight:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{height:100,background:'#f2f2f2'}} />
        <Menu
        style={{paddingTop:16}}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[path]}
          onClick={(e)=>{navigate(e.key)}}
          items={[
            {
              key: 'add_course',
              icon: <UserOutlined />,
              label: 'Add Course',
            },
            {
              key: 'view_courses',
              icon: <VideoCameraOutlined />,
              label: 'View Courses',
            },
            {
              key: 'add_student',
              icon: <UploadOutlined />,
              label: 'Add Student',
            },
            {
                key: 'view_students',
                icon: <UploadOutlined />,
                label: 'View Students',
              },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 20px',
            minHeight:100,
            background: colorBgContainer,
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="default"
            size='large'
            onClick={() => {dispatch(setLogout())}}
            style={{
              fontSize: '16px',
             
            }}
          >Logout</Button>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: "#f2f2f2",
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MasterLayout;