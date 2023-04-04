import React, { useEffect } from 'react';
import { Form, Input, Button, Radio, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function AdminInfo({
  adminInfo,
  status,
  handleSubmit,
  handleChange,
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    // 这里要用useEffect，否则会报错
    if (status === 'edit') {
      form.setFieldsValue(adminInfo);
    }
  }, [adminInfo]);
  return (
    <Form
      form={form}
      initialValues={adminInfo}
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 10,
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="管理员账号"
        name="loginId"
        rules={[{ required: true, message: '请输入管理员账号' }]}
      >
        <Input
          value={adminInfo.loginId}
          disabled={status === 'edit' ? true : false}
          onChange={(e) => handleChange(e.target.value, 'loginId')}
        />
      </Form.Item>
      <Form.Item label="管理员密码" name="loginPwd">
        <Input
          value={adminInfo.loginPwd}
          onChange={(e) => handleChange(e.target.value, 'loginPwd')}
        />
      </Form.Item>
      <Form.Item label="管理员昵称" name="nickname">
        <Input
          value={adminInfo.nickname}
          onChange={(e) => handleChange(e.target.value, 'nickname')}
        />
      </Form.Item>
      <Form.Item label="权限选择" name="permission">
        <Radio.Group
          value={adminInfo.permission}
          onChange={(e) => handleChange(e.target.value, 'permission')}
        >
          <Radio value={2}>普通管理员</Radio>
          <Radio value={1}>超级管理员</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="上传头像" name="avatar" valuePropName="fileList">
        <Upload
          name="file" // 这里的名称需要和后台接收的名称一致
          listType="picture-card"
          showUploadList={false}
          action="/api/upload"
          onChange={(info) => handleChange(info, 'avatar')}
        >
          {adminInfo.avatar ? (
            <img
              src={adminInfo.avatar}
              alt="avatar"
              style={{
                width: '100%',
              }}
            />
          ) : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}> 头像可选 </div>
            </div>
          )}
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 10, offset: 2 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
          {status === 'add' ? '确认新增' : '确认修改'}
        </Button>
        <Button htmlType="reset">重置</Button>
      </Form.Item>
    </Form>
  );
}
