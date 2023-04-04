import React, { useEffect } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { useDispatch, useSelector, useNavigate } from 'umi';
import { Avatar, Tag, Button, Switch, Popconfirm, message } from 'antd';

function AdminList() {
  const columns = [
    {
      title: '登录账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (value) => <Avatar src={value} />,
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (value) =>
        value === 1 ? (
          <Tag color="orange">超级管理员</Tag>
        ) : (
          <Tag color="blue">普通管理员</Tag>
        ),
    },
    {
      title: '账号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      render: (value) => <Switch defaultChecked={value} />,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      render: (text, record) => (
        <>
          <a
            key="edit"
            href="#"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(record._id)}
          >
            编辑
          </a>
          <Popconfirm
            title="确认删除当前管理员吗?"
            onConfirm={() => handleDelete(record._id)}
            okText="确定"
            cancelText="取消"
          >
            <a key="delete" href="#">
              删除
            </a>
          </Popconfirm>
        </>
      ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'admin/_getAdminList' });
  }, []);
  const { adminList } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/editAdmin/${id}`);
  };
  const handleDelete = (id) => {
    dispatch({ type: 'admin/_delAdmin', payload: id });
    message.info('删除成功');
  };
  return (
    <div>
      <PageContainer
        header={{
          title: '管理员列表',
        }}
      >
        <ProTable
          headerTitle="管理员信息"
          columns={columns}
          dataSource={adminList}
          rowKey={(row) => row._id}
          search={false}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
          }}
        />
      </PageContainer>
    </div>
  );
}

export default AdminList;
