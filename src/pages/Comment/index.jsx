import React, { useState, useRef } from 'react';
import { ProCard, PageContainer, ProTable } from '@ant-design/pro-components';
import { getCommentByType } from '../../services/comment';
import { Popconfirm, Modal, Tag } from 'antd';
import { useDispatch, useSelector } from '@umijs/max';
import { getUserByIdApi } from '../../services/user';
import { getIssueByIdApi } from '../../services/issue';
import { getBookByIdApi } from '../../services/book';

export default function Comment() {
  const [tab, setTab] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    pageSize: 5,
    current: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const tableRef = useRef();
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
      title: tab === 1 ? '问题标题' : '书籍标题',
      dataIndex: tab === 1 ? 'issueId' : 'bookId',
      key: tab === 1 ? 'issueId' : 'bookId',
      align: 'center',
      search: false,
      render: (text, record) => {
        if (tab === 1) {
          return record.issueTitle.slice(0, 22) + '...';
        } else {
          return record.bookTitle;
        }
      },
    },
    {
      title: '评论内容',
      dataIndex: 'commentContent',
      key: 'commentContent',
      align: 'center',
      render: (text, record) => {
        const reg = /<[^<>]+>/g;
        let str = record.commentContent.replace(reg, '');
        if (str.length > 22) {
          str = str.slice(0, 22) + '...';
        }
        return str;
      },
    },
    {
      title: '评论用户',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
      search: false,
      render: (text, record) => <Tag color="volcano">{record.nickName}</Tag>,
    },
    {
      title: '评论分类',
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
      render: (text) => <Tag color="blue">{text}</Tag>,
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
            <a style={{ marginRight: 10 }} onClick={() => handleOpen(record)}>
              详情
            </a>
            <Popconfirm
              title="确认删除该条评论吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(record._id)}
            >
              <a type="link">删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const table = (
    <ProTable
      actionRef={tableRef}
      columns={columns}
      rowKey={(row) => row._id}
      request={async (params) => {
        const { data } = await getCommentByType(tab, params);
        let newData = [];
        for (let i = 0; i < data.data.length; i++) {
          const res1 = await getUserByIdApi(data.data[i].userId);
          let bookTitle = '';
          let issueTitle = '';
          if (tab === 1) {
            const res = await getIssueByIdApi(data.data[i].issueId);
            issueTitle = res.data.issueTitle;
          } else {
            const res = await getBookByIdApi(data.data[i].bookId);
            bookTitle = '《' + res.data.bookTitle + '》';
          }
          newData.push({
            ...data.data[i],
            nickName: res1.data.nickname,
            issueTitle,
            bookTitle,
          });
        }
        return {
          data: newData,
          success: true,
          total: data.count,
        };
      }}
      pagination={{
        pageSize: pageInfo.pageSize,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 15, 20],
        onShowSizeChange: (current, size) =>
          setPageInfo({ pageSize: size, current: 1 }),
      }}
    />
  );

  const handleOpen = (row) => {
    setShowModal(true);
    setModalInfo(row);
  };
  const handleDelete = (id) => {};
  return (
    <div>
      <PageContainer header={{ title: '评论' }}>
        <ProCard
          tabs={{
            activeKey: tab,
            items: [
              {
                label: '问答评论',
                key: 1,
                children: table,
              },
              {
                label: '书籍评论',
                key: 2,
                children: table,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        />
      </PageContainer>
      <Modal
        open={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}
      >
        <h3>{tab === 1 ? modalInfo?.issueTitle : modalInfo?.bookTitle}</h3>
        <p>评论：</p>
        <div
          dangerouslySetInnerHTML={{ __html: modalInfo?.commentContent }}
        ></div>
      </Modal>
    </div>
  );
}
