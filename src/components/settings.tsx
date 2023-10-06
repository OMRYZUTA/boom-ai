import React, { useEffect, useState } from "react";
import { Form, Input, Button, Tooltip, Typography } from "antd";
import { useStorage } from "@plasmohq/storage/hook";

const { Title } = Typography;

function Settings() {
  const [form] = Form.useForm();
  const [storedUserName, setStoredUserName] = useStorage<string>("userName", "");
  const [storedUserEmail, setStoredUserEmail] = useStorage<string>("userEmail", "");
  const [storedUserPrompt, setStoredUserPrompt] = useStorage<string>("userPrompt", "");
  
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      userName: storedUserName,
      userEmail: storedUserEmail,
      userPrompt: storedUserPrompt
    });
  }, [storedUserName, storedUserEmail, storedUserPrompt, form]);

  const onFinish = (values) => {
    setStoredUserName(values.userName);
    setStoredUserEmail(values.userEmail);
    setStoredUserPrompt(values.userPrompt);
    setEditMode(false);
  };

  return (
    <>
      {storedUserName && storedUserEmail && !editMode ? (
        <>
          <Title level={4}>Settings</Title>
          <p>Name: {storedUserName}</p>
          <p>Email: {storedUserEmail}</p>
          <p>Prompt: {storedUserPrompt || 'No prompt defined'}</p>
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        </>
      ) : (
          <> 
            <Title level={4}>Settings</Title>
            <p>Enter your name and your active mail to use Boom. All your meetings and summaries will be sent to this mail </p>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Name" name="userName" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="userEmail" rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label={<Tooltip title="You can write here what kind of summaries you want.">Prompt</Tooltip>} name="userPrompt">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
            </Form>
            </>
      )}
    </>
  );
}

export default Settings;
