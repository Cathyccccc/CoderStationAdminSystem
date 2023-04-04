import React, { useState, useEffect } from 'react';
import { Card, Tag } from 'antd';
import { useDispatch, useSelector, useParams } from '@umijs/max';
import { getInterviewByIdApi } from '../../services/interview';
import './index.css';

export default function InterviewDetail() {
  const [interviewInfo, setInterviewInfo] = useState(null);
  const dispatch = useDispatch();
  const { typeList } = useSelector((state) => state.type);
  const { id } = useParams();

  if (!typeList) dispatch({ type: 'type/_getTypeList' });

  useEffect(() => {
    async function fetchInterviewData(_id) {
      const { data } = await getInterviewByIdApi(id);
      const type = typeList?.find((item) => item._id === data.typeId).typeName;
      setInterviewInfo({
        ...data,
        typeName: type,
      });
    }
    if (id) {
      fetchInterviewData(id);
    }
  }, []);

  return (
    <Card
      className="card-detail"
      title={<h1>{interviewInfo?.interviewTitle}</h1>}
      bordered={false}
      extra={<Tag color="#1890FF">{interviewInfo?.typeName}</Tag>}
    >
      <div
        dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }}
      ></div>
    </Card>
  );
}
