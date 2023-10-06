import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';

const { Title, Text } = Typography;

interface AnswerProps {
  title: string;
  type: string;
  content: string;
  id: string | number;
  timestamp: string | number;
}

const SuggestionAnswer: React.FC<AnswerProps> = ({ title, type, content, id, timestamp }) => {
  const dateObj = new Date(timestamp);
  const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Card>
      <Row gutter={16}>
        <Col span={18}>
          <Title level={4}>Text suggestion</Title>
          <Text strong>{content}</Text>
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={copyToClipboard}>
            Copy
          </Button>
        </Col>
        <Col span={20} offset={20} style={{ fontSize: "10px" }}>
          <Text type="secondary">{formattedTime}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default SuggestionAnswer;
