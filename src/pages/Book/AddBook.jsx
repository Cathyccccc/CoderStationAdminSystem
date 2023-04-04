import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import BookForm from './components/bookForm';
import { useParams, useNavigate } from '@umijs/max';
import { editBookApi, addBookApi } from '../../services/book';
import { message } from 'antd';

export default function AddBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (newBookInfo) => {
    if (id) {
      // 编辑书籍
      await editBookApi(id, newBookInfo);
      message.success('修改成功');
    } else {
      // 新增书籍
      await addBookApi(newBookInfo);
      message.success('新增成功');
    }
    navigate('/book/bookList');
  };
  return (
    <div>
      <PageContainer header={{ title: id ? '编辑书籍' : '添加书籍' }}>
        <BookForm id={id} handleSubmit={handleSubmit} />
      </PageContainer>
    </div>
  );
}
