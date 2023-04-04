import React, { useRef } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getUserByPageApi, delUserApi } from '../../services/user';
import { Switch, Popconfirm, message } from 'antd';
import { useNavigate } from '@umijs/max';

export default function UserList() {
  const navigate = useNavigate();
  const tableRef = useRef();
  const columns = [
    {
      title: '排序',
      dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center',
      width: 60,
    },
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
      search: false,
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
      valueType: 'avatar',
      search: false,
    },
    {
      title: '账号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      search: false,
      render: (value) => <Switch checked={value} />,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      search: false,
      render: (text, record) => (
        <>
          <a
            href="#"
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(record._id)}
          >
            编辑
          </a>
          <Popconfirm
            title="确认删除该用户吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => handleDelete(record._id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/user/editUser/${id}`);
  };

  const handleDelete = async (id) => {
    await delUserApi(id);
    message.info('用户已删除');
    tableRef.current.reload(); // 重新渲染表格
  };

  return (
    <div>
      <PageContainer header={{ title: '用户列表' }}>
        <ProTable
          columns={columns}
          request={async (params) => {
            // 点击分页时params会自动更新（{pageSize: 5, current: ？ }）
            const res = await getUserByPageApi(params);
            return {
              data: res.data.data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: res.data.count, // 手动触发分页一定要传total
            };
          }}
          actionRef={tableRef}
          rowKey={(row) => row._id}
          pagination={{
            // 这里不要写total，否则分页没有效果。返回的request中已经有total了
            pageSize: 5, // 这里规定params中的pageSize
            showQuickJumper: true,
          }}
        />
      </PageContainer>
    </div>
  );
}
