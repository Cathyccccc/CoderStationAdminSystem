import React, { useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Popconfirm } from 'antd';
import { useSelector, useDispatch } from '@umijs/max';

export default function Type() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'type/_getTypeList' });
  }, []);
  const { typeList } = useSelector((state) => state.type);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 100,
      align: 'center',
    },
    {
      title: '分类名称',
      dataIndex: 'typeName',
      key: 'typeName',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      render: (text, record) => (
        <Popconfirm
          title="确认删除当前分类吗?"
          okText="确认"
          cancelText="取消"
          onConfirm={() => handleDelete(record._id)}
        >
          <a>删除</a>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div>
      <PageContainer>
        <ProTable
          columns={columns}
          dataSource={typeList}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
          }}
          rowKey={(row) => row._id}
          search={false}
        />
      </PageContainer>
    </div>
  );
}
