import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import {MailOutlined} from  '@ant-design/icons'
const { Title, Text } = Typography;

interface AnswerProps {
  title: string;
  type: string;
  content: string;
  id: string | number;
  timestamp: string | number;
}

const CalendarAnswer: React.FC<AnswerProps> = ({ title, type, content, id, timestamp }) => {
  const parsedContent = JSON.parse(content);
  const { title: parsedTitle, hour, date, summary } = parsedContent;

  const formattedHour = `${hour.substring(0, 2)}:${hour.substring(2)}`;
  const formattedDate = `${date.substring(0, 4)}/${date.substring(4, 6)}/${date.substring(6)}`;

  const dateObj = new Date(timestamp);
  const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
  return (
    <Card>
      <Row gutter={16}>
        <Col span={20}>
          <Title level={4}>{parsedTitle}</Title>
          <div>
            <Text strong>Title: </Text><Text>{parsedTitle}</Text>
          </div>
          <div>
            <Text strong>Hour: </Text><Text>{formattedHour}</Text>
          </div>
          <div>
            <Text strong>Date: </Text><Text>{formattedDate}</Text>
          </div>
          <div>
            <Text strong>Summary: </Text><Text>{summary}</Text>
          </div>
        </Col>
        
      </Row>
      <br />
      
      <Row>
        <Col span={8}  style={{ fontSize: "10px", display:"flex", justifyContent:"space-between" }} >
          <MailOutlined />
          <Text type="secondary">Mail sent</Text>
        </Col>
        <Col span={8} offset={7} >
          <Text type="secondary">{formattedTime}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default CalendarAnswer;
