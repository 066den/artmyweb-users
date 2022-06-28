import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Radio,
  Checkbox,
  message,
  PageHeader,
} from 'antd';

import { userAPI } from '../../services/UserService';

const UserEdit: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = userAPI.useFetchUserQuery(Number(id));
  const [editUser, { error }] = userAPI.useEditUserMutation();

  const onFinish = async (values: any) => {
    await editUser({
      ...values,
      id: data?.data.id,
      status: values.status === 'checked' ? 'active' : 'inactive',
    });
    if (error) {
      message.error(`The request failed`);
    } else {
      refetch();
    }
  };

  const checkStatus = useMemo(() => {
    return data?.data.status === 'active' ? 'checked' : '';
  }, [data?.data.status]);

  const HandleGoBackClick = useCallback(() => {
    navigate('/users');
  }, []);

  return (
    <>
      <PageHeader onBack={HandleGoBackClick} title='goBack' />
      {!isLoading && (
        <div className='container'>
          <Row justify='center'>
            <Typography.Title level={2}>
              Edit user {data?.data.name}
            </Typography.Title>
          </Row>

          <Row justify='center'>
            <Col md={12}>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{
                  name: data?.data.name,
                  email: data?.data.email,
                  gender: data?.data.gender,
                  status: checkStatus,
                }}
                onFinish={onFinish}
                autoComplete='off'
              >
                <Form.Item
                  label='Username'
                  name='name'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label='Gender' name='gender'>
                  <Radio.Group>
                    <Radio value='male'> Male </Radio>
                    <Radio value='female'> Female </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name='status'
                  valuePropName={checkStatus}
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }}
                >
                  <Checkbox>Active</Checkbox>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }}
                >
                  <Button type='primary' htmlType='submit' className='btn'>
                    Edit user
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default UserEdit;
