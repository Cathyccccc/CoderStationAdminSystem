import React, { useState, useEffect } from 'react';
import { Card, Tag } from 'antd';
import { useParams, useDispatch, useSelector } from '@umijs/max';
import { getIssueByIdApi } from '../../services/issue';
import { getUserByIdApi } from '../../services/user';
import { formatDate } from '../../utils/format';

export default function IssueDetail() {
  const { id } = useParams();
  const [issueInfo, setIssueInfo] = useState({});
  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchIssueData(_id) {
      const { data } = await getIssueByIdApi(_id);
      if (!typeList) {
        dispatch({ type: 'type/_getTypeList' });
      }
      const res = await getUserByIdApi(data.userId);
      setIssueInfo({
        ...data,
        typeName: typeList?.find((item) => item._id === data.typeId).typeName,
        userName: res.data.nickname,
      });
    }
    if (id) {
      fetchIssueData(id);
    }
  }, []);
  return (
    <div>
      <Card
        title={issueInfo?.issueTitle}
        bordered={false}
        extra={<Tag color="#1890FF">{issueInfo?.typeName}</Tag>}
      >
        <h2>提问用户</h2>
        <p>
          <Tag color="volcano" key={issueInfo?.userId}>
            {issueInfo?.userName}
          </Tag>
        </p>
        <h2>问题描述</h2>
        <p>
          <div
            dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}
          ></div>
        </p>
        <h2>提问时间</h2>
        <p>{formatDate(issueInfo?.issueDate)}</p>
        <h3>浏览数：{issueInfo?.scanNumber}</h3>
        <p></p>
        <h3>评论数：{issueInfo?.scanNumber}</h3>
      </Card>
    </div>
  );
}
