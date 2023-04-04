import React, { useEffect, useState, useRef } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Tag, Popconfirm, message } from 'antd';
import { useDispatch, useSelector, useNavigate } from '@umijs/max';
import { formatDate } from '../../utils/format';
import {
  getInterviewByPageApi,
  delInterviewApi,
} from '../../services/interview';

export default function InterviewList() {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const [pageInfo, setPageInfo] = useState({
    pageSize: 5,
    current: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'type/_getTypeList' });
  }, []);
  const { typeList } = useSelector((state) => state.type);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center',
    },
    {
      title: '题目名称',
      dataIndex: 'interviewTitle',
      key: 'interviewTitle',
      align: 'center',
    },
    {
      title: '题目分类',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
      // search: {
      //   transform: (value) => { // 对搜索输入的值进行转化
      //     const result = typeList.findIndex(item => item.typeName.includes(value));
      //     console.log(result)
      //   },
      // },
      valueType: 'select', // 改变搜索框类型为select，同时需要配合valueEnum渲染Select的option。valueEnum为一个对象，搜索时向params中添加的搜索项的值，为valueEnum对象的属性key，这里不要直接写成数组
      valueEnum: () => {
        let obj = {};
        typeList?.forEach((item) => {
          obj[item._id] = { typeId: item._id, text: item.typeName };
        });
        return obj;
      },
      render: (text, record) => {
        const type = typeList?.filter((item) => item._id === record.typeId)[0]
          .typeName;
        return <Tag color="blue">{type}</Tag>;
      },
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
      render: (text, record) => {
        return (
          <>
            <a
              onClick={() => handleOpen(record._id)}
              style={{ marginRight: 10 }}
            >
              详情
            </a>
            <a
              href="#"
              style={{ marginRight: 10 }}
              onClick={() => handleEdit(record._id)}
            >
              编辑
            </a>
            <Popconfirm
              title="确认删除该面试题目吗？"
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

  // 查看详情
  const handleOpen = async (id) => {
    navigate(`/interview/interviewList/${id}`);
  };
  // 编辑题目
  const handleEdit = (id) => {
    navigate(`/interview/editInterview/${id}`);
  };
  // 删除题目
  const handleDelete = async (id) => {
    await delInterviewApi(id);
    message.info('面试题已删除');
    tableRef.current.reload(); // 刷新表格
  };

  return (
    <div>
      <PageContainer header={{ title: '题目列表' }}>
        <ProTable
          columns={columns}
          request={async (params) => {
            const { data } = await getInterviewByPageApi(params);
            return {
              data: data.data,
              success: true,
              total: data.count,
            };
          }}
          actionRef={tableRef}
          rowKey={(row) => row._id}
          pagination={{
            pageSize: pageInfo.pageSize,
            showQuickJumper: true,
            pageSizeOptions: [5, 10, 15, 20],
            onShowSizeChange: (current, size) => {
              setPageInfo({
                pageSize: size,
                current: 1,
              });
            },
          }}
        />
      </PageContainer>
    </div>
  );
}
