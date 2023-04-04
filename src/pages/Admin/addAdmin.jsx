import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import AdminForm from './components/adminForm';
import { useDispatch, useParams, useNavigate } from 'umi';
import { getAdminByIdApi } from '../../services/admin';
import { message } from 'antd';

export default function AddAdmin() {
  const [adminForm, setAdminForm] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    permission: 2, // 默认为普通管理员
  });
  const [status, setStatus] = useState('add');
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdminById(_id) {
      const { data } = await getAdminByIdApi(_id);
      setAdminForm(data);
    }
    // 有id通过路径传过来说明是编辑管理员
    if (id) {
      setStatus('edit');
      fetchAdminById(id);
    } else {
      setStatus('add');
    }
  }, []);

  const handleChange = (value, type) => {
    if (type === 'avatar' && value.file.status === 'done') {
      // 必须status为done时才可以设置state，否则报错，且文件上传不成功
      setAdminForm({
        ...adminForm,
        avatar: value.file.response.data,
      });
    } else {
      setAdminForm({
        ...adminForm,
        [type]: value,
      });
    }
  };

  const handleSubmit = (values) => {
    // 这里不要直接使用values，因为values中avatar是一个对象，并不是字符串
    if (status === 'edit') {
      // ！！！编辑状态下，用户的loginId不可修改
      dispatch({
        type: 'admin/_editAdmin',
        payload: { id, newAdminInfo: adminForm },
      }); // id从params来
      message.success('修改成功');
    } else if (status === 'add') {
      dispatch({ type: 'admin/_addAdmin', payload: adminForm });
      message.success('添加成功');
    }
    navigate('/admin/adminList');
  };

  return (
    <div>
      <PageContainer
        header={{
          title: status === 'add' ? '添加管理员' : '编辑管理员',
        }}
      >
        <AdminForm
          adminInfo={adminForm}
          status={status}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </PageContainer>
    </div>
  );
}
