import React from 'react';
import UserForm from './components/userForm';
import { PageContainer } from '@ant-design/pro-components';
import { useParams, useNavigate } from '@umijs/max';
import { addUserApi, editUserApi } from '../../services/user';
import { message } from 'antd';

export default function AddUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    let newUserInfo = values;
    if (values.avatar) {
      newUserInfo = {
        ...values,
        avatar: values.avatar[0].response.data,
      };
    }
    if (id) {
      // 编辑用户
      await editUserApi(id, newUserInfo);
      message.success('修改成功');
    } else {
      // 新增用户
      await addUserApi(newUserInfo);
      message.success('新增成功');
    }
    navigate('/user/userList');
  };
  return (
    <div>
      <PageContainer header={{ title: '新增用户' }}>
        <UserForm id={id} handleSubmit={handleSubmit} />
      </PageContainer>
    </div>
  );
}
