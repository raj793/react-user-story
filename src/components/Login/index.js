import React, {useState} from 'react';
import { Form, Input, Button, Switch } from 'antd';
import LoginApi from '../../api/loginApi';
import { useCookies } from 'react-cookie';
import {COOKIE_KEY} from '../../config'
import './login.css';

/* 
Component to login the user/admin to the app.
*/
const Login = () => {

  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies();

  const onFinish = async values => {
    const login = new LoginApi();
    setLoading(true);
    try{
      const res = await login.signin(values);
      if(res.status === 200) {
        setCookie(COOKIE_KEY, res.data, { path: '/' })
        window.location.reload();
      }
    }
    catch(err) {
      console.log(err)
    }
    setLoading(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
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
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="isAdmin" name="isAdmin">
            <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;