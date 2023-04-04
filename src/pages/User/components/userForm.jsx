import React, { useRef, useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormUploadButton,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { getUserByIdApi } from '../../../services/user';

export default function UserForm({ id, handleSubmit }) {
  const formRef = useRef();
  const [fileList, setFileList] = useState([]);
  return (
    <ProForm
      // initialValues={}
      formRef={formRef}
      layout="horizontal"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 10 }}
      submitter={{
        // 配置按钮文本
        render: (props, doms) => {
          return (
            <ProForm.Item wrapperCol={{ offset: 2, span: 10 }}>
              <Button
                htmlType="sumbit"
                key="submit"
                type="primary"
                style={{ marginRight: 15 }}
              >
                提交
              </Button>
              <Button htmlType="reset" key="reset">
                重置
              </Button>
            </ProForm.Item>
          );
        },
      }}
      onFinish={handleSubmit}
      params={{ id }}
      request={
        id
          ? async () => {
              const { data } = await getUserByIdApi(id);
              // return data;
              setFileList([{ url: data.avatar }]);
              return {
                // 这里必须一项一项写，不能直接返回data，否则报错 Uncaught TypeError: (fileList || []).forEach is not a function
                loginId: data.loginId,
                loginPwd: data.loginPwd,
                nickname: data.nickname,
                // avatar: data.avatar,
                mail: data.mail,
                qq: data.qq,
                wechat: data.wechat,
                intro: data.intro,
              };
            }
          : null
      }
    >
      <ProFormText
        name="loginId"
        label="登录账号"
        placeholder="请填写登录账号"
        disabled={id ? true : false}
        rules={[{ required: true, message: '请添加登录账号' }]}
      />
      <ProFormText name="loginPwd" label="登录密码" />
      <ProFormText name="nickname" label="用户昵称" />
      <ProFormUploadButton
        name="avatar"
        label="用户头像"
        max={1}
        fileList={fileList}
        fieldProps={{
          name: 'file', // 发送到后台的文件参数名
          listType: 'picture-card',
          onChange: ({ fileList }) => setFileList(fileList),
        }}
        action="/api/upload"
        valuePropName="fileList"
      >
        {fileList.length > 0 ? <img src={fileList[0].url} /> : null}
      </ProFormUploadButton>
      <ProFormText name="mail" label="用户邮箱" />
      <ProFormText name="qq" label="QQ号码" />
      <ProFormText name="wechat" label="微信号" />
      <ProFormTextArea name="intro" label="自我介绍" fieldProps={{ rows: 5 }} />
    </ProForm>
  );
}
