import React, { useState, useRef } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {
  getIssueByPageApi,
  delIssueApi,
  editIssueApi,
} from '../../services/issue';
import { Tag, Popconfirm, Switch, message } from 'antd';
import { useDispatch, useSelector, useNavigate } from '@umijs/max';

export default function Issue() {
  const tableRef = useRef();
  const [pageInfo, setPageInfo] = useState({
    pageSize: 5,
    current: 1,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { typeList } = useSelector((state) => state.type);
  if (!typeList) {
    dispatch({ type: 'type/_getTypeList' });
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center',
    },
    {
      title: '问答标题',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      align: 'center',
      render: (text, record) => {
        let str = record.issueTitle;
        if (str.length > 22) {
          str = str.slice(0, 22) + '...';
        }
        return str;
      },
    },
    {
      title: '问答描述',
      dataIndex: 'issueContent',
      key: 'issueContent',
      align: 'center',
      search: false,
      render: (text, record) => {
        const reg = /<[^<>]+>/g;
        let str = record.issueContent.replace(reg, '');
        if (str.length > 25) {
          str = str.slice(0, 25) + '...';
        }
        return str;
      },
    },
    {
      title: '浏览数',
      dataIndex: 'scanNumber',
      key: 'scanNumber',
      align: 'center',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentNumber',
      key: 'commentNumber',
      align: 'center',
      search: false,
    },
    {
      title: '问题分类',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
      valueType: 'select',
      valueEnum: () => {
        let obj = {};
        typeList?.forEach((item) => {
          obj[item._id] = { typeId: item._id, text: item.typeName };
        });
        return obj;
      },
      render: (text, record) => {
        const type = typeList?.find(
          (item) => item._id === record.typeId,
        ).typeName;
        return <Tag color="blue">{type}</Tag>;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'issueStatus',
      key: 'issueStatus',
      align: 'center',
      search: false,
      render: (text, record) => (
        <Switch
          checked={record.issueStatus}
          onChange={(value) => handleSwitchChange(record, value)}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      search: false,
      render: (text, record) => {
        return (
          <>
            <a
              href="#"
              style={{ marginRight: 10 }}
              onClick={() => handleOpen(record._id)}
            >
              详情
            </a>
            <Popconfirm
              title="确认删除该问答吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(record._id)}
            >
              <a href="#">删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleSwitchChange = async (row, value) => {
    // 估计这里需要token，所以暂时修改不了，等后续登录页面做了再改
    // await editIssueApi(row._id, {
    //   ...row,
    //   issueStatus: !value
    // })
    // tableRef.current.reload();
  };
  const handleOpen = (id) => {
    navigate(`/issue/${id}`);
  };
  const handleDelete = async (id) => {
    await delIssueApi(id);
    message.info('问题已删除');
    tableRef.current.reload();
  };
  return (
    <div>
      <PageContainer header={{ title: '问题列表' }}>
        <ProTable
          actionRef={tableRef}
          columns={columns}
          request={async (params) => {
            const { data } = await getIssueByPageApi(params);
            return {
              data: data.data,
              success: true,
              total: data.count,
            };
          }}
          rowKey={(row) => row._id}
          pagination={{
            pageSize: pageInfo.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            onShowSizeChange: (current, size) =>
              setPageInfo({ pageSize: size, current: 1 }),
          }}
        />
      </PageContainer>
    </div>
  );
}
