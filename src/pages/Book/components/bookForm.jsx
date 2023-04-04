import React, { useEffect, useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, Select } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from '@umijs/max';
import { getBookByIdApi } from '../../../services/book';

export default function BookForm({ id, handleSubmit }) {
  const [form] = Form.useForm();
  const editorRef = useRef();
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'type/_getTypeList' });
  }, []);
  const { typeList } = useSelector((state) => state.type);

  useEffect(() => {
    async function fetchBookById(_id) {
      const { data } = await getBookByIdApi(_id);
      form.setFieldsValue({
        // 这里跟ProForm一样需要分开一项一项写，不能直接给个对象
        bookTitle: data.bookTitle,
        downloadLink: data.downloadLink,
        requirePoints: data.requirePoints,
        typeId: data.typeId,
      });
      setFileList([{ url: data.bookPic }]); // 上传的图片单独设置
      editorRef.current.getInstance().setHTML(data.bookIntro); // 编辑框的内容单独设置（这里获取组件DOM实例需要使用个getInstance，getHTML要大写）
    }
    if (id) {
      fetchBookById(id);
    }
  }, [id]);

  const handleFinish = (values) => {
    let newBookInfo = values;
    // 处理图片
    if (values.bookPic) {
      newBookInfo = {
        ...values,
        bookPic: values.bookPic.file.response.data,
      };
    } else {
      // 处理没有封面时，后台数据验证不通过的问题
      newBookInfo.bookPic = ''; // 后台验证要求bookPic必须为string，即使为空
    }
    // 处理编辑框内容（bookIntro一定有值，值为设置的initialEditType）
    const htmlStr = editorRef.current.getInstance().getHTML();
    newBookInfo.bookIntro = htmlStr;
    handleSubmit(newBookInfo);
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
          label="书籍标题"
          name="bookTitle"
          rules={[{ required: true, message: '请添加书籍标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="书籍介绍"
          name="bookIntro"
          wrapperCol={{ span: 20 }}
          rules={[{ required: true, message: '请添加书籍介绍' }]}
        >
          <Editor
            ref={editorRef}
            initialValue=""
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
          />
        </Form.Item>
        <Form.Item
          label="下载链接"
          name="downloadLink"
          rules={[{ required: true, message: '请添加书籍资源下载链接' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="所需积分"
          name="requirePoints"
          rules={[{ required: true, message: '请选择书籍下载所需积分' }]}
        >
          <Select
            options={[
              { value: 10, label: 10 },
              { value: 20, label: 20 },
              { value: 30, lable: 30 },
              { value: 40, label: 40 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          label="书籍分类"
          name="typeId"
          rules={[{ required: true, message: '请选择书籍分类' }]}
        >
          <Select>
            {typeList?.map((item) => (
              <Select.Option key={item._id}>{item.typeName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="书籍封面" name="bookPic">
          <Upload
            name="file"
            action="/api/upload"
            listType="picture-card"
            maxCount={1}
            fileList={fileList} // 这里直接渲染fileList，因此不需要再设置img标签了
            onChange={({ file, fileList }) => setFileList(fileList)}
          >
            {fileList.length > 0 ? null : <PlusOutlined />}
          </Upload>
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
