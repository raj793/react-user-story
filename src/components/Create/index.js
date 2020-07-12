import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber
} from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import StoryApi from '../../api/storyApi';
import './create.css';

/* 
Component to create a user story via api
*/
const Create = ({user}) => {
  const storyApi = new StoryApi(user.token);
  const history = useHistory();

  const onFinish = async values => {
    const res = await storyApi.createStory(values);
    if(res.status === 201) {
      history.push('/story')
    }
  };

  const onFinishFailed = values => {
    console.log('Failed:', values);
  }

  return (
  <div className="form-container">
    Create ticket
    <br/>
    <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Summary"
          name="summary"
          rules={[
            {
              required: true,
              message: 'Please input your summary!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your description!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item 
          label="Type" 
          name="type" 
          rules={[
            {
              required: true,
              message: 'Please select type!',
            },
          ]}
        >
          <Select>
            <Select.Option value="enhancement">Enhancement</Select.Option>
            <Select.Option value="bugfix">Bugfix</Select.Option>
            <Select.Option value="development">Development</Select.Option>
            <Select.Option value="qa">QA</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label="Complexity" 
          name="complexity" 
          rules={[
            {
              required: true,
              message: 'Please select complexity!',
            },
          ]}
        >
          <Select>
            <Select.Option value="low">Low</Select.Option>
            <Select.Option value="mid">Mid</Select.Option>
            <Select.Option value="high">High</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label="Estimated time for completion" 
          name="estimatedHrs"
          rules={[
            {
              required: true,
              message: 'Please input hours!',
            },
          ]}
        >
          <InputNumber 
            defaultValue={1}
          />
        </Form.Item>

        <Form.Item 
          label="Cost" 
          name="cost"
          rules={[
            {
              required: true,
              message: 'Please input cost!',
            },
          ]}
        >
          <InputNumber 
          defaultValue={1}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
        </Form.Item>

        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        
      </Form>
  </div>)
}

function mapStateToProps(store){
  return{
      user: store.app.user
  };
}

export default connect(mapStateToProps)(Create);