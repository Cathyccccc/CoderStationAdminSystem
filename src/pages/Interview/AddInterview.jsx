import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import InterviewForm from './components/interviewForm';
import { useParams, useNavigate } from '@umijs/max';
import { addInterviewApi, editInterviewApi } from '../../services/interview';
import { message } from 'antd';

export default function AddInterview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (newInterviewInfo) => {
    if (id) {
      // 修改面试题
      await editInterviewApi(id, newInterviewInfo);
      message.success('修改成功');
    } else {
      // 新增面试题
      await addInterviewApi(newInterviewInfo);
      message.success('新增成功');
    }
    navigate('/interview/interviewList');
  };
  return (
    <div>
      <PageContainer header={{ title: id ? '修改题目' : '新增题目' }}>
        <InterviewForm id={id} handleSubmit={handleSubmit} />
      </PageContainer>
    </div>
  );
}
