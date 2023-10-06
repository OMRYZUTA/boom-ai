import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface AnswerProps {
  title: string;
  type: string;
  content: string;
  id: string | number;
  timestamp: string | number;
}

const SummaryAnswer: React.FC<AnswerProps> = ({ title, type, content, id, timestamp }) => {
  const parsedContent = JSON.parse(content);
  const { title: parsedTitle, summary, people, hour, date, action_item } = parsedContent;

  const dateObj = new Date(timestamp);
  const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Card>
      <Row gutter={16}>
        <Col span={20}>
          <Title level={4}>{parsedTitle}</Title>
          {parsedTitle && (
            <div>
              <Text strong>Title: </Text><Text>{parsedTitle}</Text>
            </div>
          )}
          {people && (
            <div>
              <Text strong>People: </Text><Text>{people}</Text>
            </div>
          )}
          {hour && (
            <div>
              <Text strong>Hour: </Text><Text>{hour}</Text>
            </div>
          )}
          {date && (
            <div>
              <Text strong>Date: </Text><Text>{date}</Text>
            </div>
          )}
          {summary && (
            <div>
              <Text strong>Summary: </Text><Text>{summary}</Text>
            </div>
          )}
          {action_item && (
            <div>
              <Text strong>Action Items: </Text><Text>{action_item}</Text>
            </div>
          )}
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={copyToClipboard}>
            Copy
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={8} style={{ fontSize: "10px", display: "flex", justifyContent: "space-between" }}>
          <MailOutlined />
          <Text type="secondary">Mail sent</Text>
        </Col>
        <Col span={8} offset={7}>
          <Text type="secondary">{formattedTime}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryAnswer;
