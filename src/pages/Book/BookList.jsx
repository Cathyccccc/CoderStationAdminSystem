import React, { useRef, useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Popconfirm, Tag, message } from 'antd';
import { getBookByPage, delBookApi } from '../../services/book';
import { useSelector, useDispatch, useNavigate } from '@umijs/max';
import { formatDate } from '../../utils/format';

export default function BookList() {
  const dispatch = useDispatch();
  const tableRef = useRef();
  useEffect(() => {
    dispatch({ type: 'type/_getTypeList' });
  }, []);
  const { typeList } = useSelector((state) => state.type);
  const navigate = useNavigate();
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center',
      search: false,
    },
    {
      title: '书籍名称',
      dataIndex: 'bookTitle',
      key: 'bookTitle',
      align: 'center',
    },
    {
      title: '书籍分类',
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
      render: (text, record, index) => {
        // 根据id获取类型
        const type = typeList?.filter((item) => item._id === record.typeId)[0]
          .typeName;
        return <Tag color="blue">{type}</Tag>;
      },
    },
    {
      title: '书籍简介',
      dataIndex: 'bookIntro',
      key: 'bookIntro',
      width: 300,
      align: 'center',
      search: false,
      render: (text, record) => {
        const reg = /<[^<>]+>/g;
        let str = record.bookIntro.replace(reg, '');
        str = str.slice(0, 30) + '...';
        return str;
      },
    },
    {
      title: '书籍封面',
      dataIndex: 'bookPic',
      key: 'bookPic',
      align: 'center',
      valueType: 'image',
      search: false,
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
      title: '上架日期',
      dataIndex: 'onShelfDate',
      key: 'onShelfDate',
      align: 'center',
      search: false,
      render: (text, record) => formatDate(record.onShelfDate, 'year'),
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
            title="确认删除该书籍吗？"
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
    navigate(`/book/editBook/${id}`);
  };
  const handleDelete = async (id) => {
    await delBookApi(id);
    message.info('书籍已删除');
    tableRef.current.reload(); // 重新渲染表格
  };

  return (
    <div>
      <PageContainer header={{ title: '书籍列表' }}>
        <ProTable
          columns={columns}
          request={async (params) => {
            const { data } = await getBookByPage(params);
            return {
              data: data.data,
              success: true,
              total: data.count,
            };
          }}
          actionRef={tableRef} // 便于对表格进行操作（如手动触发表格重新渲染）
          rowKey={(row) => row._id}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
          }}
        />
      </PageContainer>
    </div>
  );
}
