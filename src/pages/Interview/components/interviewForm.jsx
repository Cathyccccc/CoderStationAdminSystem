import React, { useRef, useEffect } from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from '@umijs/max';
import { getInterviewByIdApi } from '../../../services/interview';

export default function InterviewForm({ id, handleSubmit }) {
  const editorRef = useRef();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { typeList } = useSelector((state) => state.type);
  if (!typeList) {
    dispatch({ type: 'type/_getTypeList' });
  }
  useEffect(() => {
    async function fetchInterviewInfo(_id) {
      const { data } = await getInterviewByIdApi(_id);
      form.setFieldsValue({
        interviewTitle: data.interviewTitle,
        typeId: data.typeId,
      });
      editorRef.current.getInstance().setHTML(data.interviewContent);
    }
    if (id) {
      fetchInterviewInfo(id);
    }
  }, []);

  const handleFinish = (values) => {
    const newInterviewInfo = {
      ...values,
      interviewContent: editorRef.current.getInstance().getHTML(),
    };
    handleSubmit(newInterviewInfo);
  };

  return (
    <div>
      <Form
        form={form}
        wrapperCol={{ span: 10 }}
        labelCol={{ span: 2 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="题目标题"
          name="interviewTitle"
          rules={[{ required: true, message: '请填写题目标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="题目分类"
          name="typeId"
          rules={[{ required: true, message: '请选择题目分类' }]}
        >
          <Select
            options={typeList?.map((item) => ({
              label: item.typeName,
              value: item._id,
            }))}
          ></Select>
        </Form.Item>
        <Form.Item
          label="题目内容"
          name="interviewContent"
          wrapperCol={{ span: 20 }}
          rules={[{ required: true, message: '请填写题目内容' }]}
        >
          <Editor
            ref={editorRef}
            height="600px"
            previewStyle="vertical"
            initialEditType="wysiwyg" // 如果是详情最好是markdown
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10, offset: 2 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
            {id ? '确认修改' : '确认新增'}
          </Button>
          <Button htmlType="reset">重置</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
