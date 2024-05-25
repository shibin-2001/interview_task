import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div style={{height:'calc(100vh - 150px)',display:'flex',justifyContent:'center',alignItems:'center'}}>

        <div style={{textAlign:'center'}}>
        <h1>Page Not Found</h1>
        <h5>Go to login page</h5>
        <Button onClick={()=>navigate('/login')} type='primary'>Login</Button>
        </div>
    </div>
  )
}

export default NotFound
