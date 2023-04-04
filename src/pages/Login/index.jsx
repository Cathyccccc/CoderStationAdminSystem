import React, { useState, useEffect } from 'react';
import ReactCanvasNest from 'react-canvas-nest';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from '@ant-design/pro-components';
import { message, Space, Tabs } from 'antd';
import logo from '../../assets/logo.png';
import {
  adminLoginApi,
  getCaptchaApi,
  adminIsExistApi,
} from '../../services/login';
import { getAdminByIdApi } from '../../services/admin';
import './index.css';
import { useDispatch, useNavigate } from '@umijs/max';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default function Login() {
  const [captcha, setCaptcha] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchCaptcha() {
    const res = await getCaptchaApi();
    setCaptcha(res);
  }
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const { data } = await adminLoginApi(values);
      if (data) {
        console.log(data);
        if (data.data.enabled) {
          // 登录成功
          // 设置token
          localStorage.setItem('userToken', data.token);
          // 设置userInfo
          const res = await getAdminByIdApi(data.data._id);
          dispatch({ type: 'admin/initAdminInfo', payload: res.data });
          // 提示和跳转
          message.success('登录成功');
          navigate('/home');
        } else {
          // 账号被禁
          message.error('账号被禁，无法登录');
        }
      } else {
        // 验证码错误
        fetchCaptcha(); // 重新获取验证码
        message.error('验证码错误，请重新输入');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ReactCanvasNest
        config={{ pointColor: ' 255, 255, 255 ' }}
        style={{ zIndex: 99 }}
      />
      <div style={{ zIndex: 100 }} className="loginForm">
        <LoginForm
          title={<img src={logo} width={300} />}
          subTitle={<h1>后台管理系统</h1>}
          validateTrigger={['onBlur']}
          // actions={
          //   <Space>
          //     其他登录方式
          //     <AlipayCircleOutlined style={iconStyles} />
          //     <TaobaoCircleOutlined style={iconStyles} />
          //     <WeiboCircleOutlined style={iconStyles} />
          //   </Space>
          // }
          onFinish={handleSubmit}
        >
          <ProFormText
            name="loginId"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
              {
                validator: async (rule, value) => {
                  if (!value) return;
                  const { data } = await adminIsExistApi(value);
                  if (!data) {
                    return Promise.reject('用户不存在');
                  }
                  return Promise.resolve();
                },
                validateTrigger: 'onBlur',
              },
            ]}
          />
          <ProFormText.Password
            name="loginPwd"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <ProForm.Group>
            <ProFormText
              name="captcha"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入验证码'}
              rules={[
                {
                  required: true,
                  message: '请输入验证码!',
                },
              ]}
            />
            <div dangerouslySetInnerHTML={{ __html: captcha }}></div>
          </ProForm.Group>
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="remember">
              七天内免登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码?
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
}
