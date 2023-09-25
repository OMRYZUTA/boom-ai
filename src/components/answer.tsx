import React from 'react';
import { Typography, Card } from 'antd';

const { Title } = Typography;

interface AnswerProps {
  title: string;
  type: string;
  content: string;
  id: string | number;
  timestamp: string | number;
}

const Answer: React.FC<AnswerProps> = ({ title, type, content, id, timestamp }) => {
  console.log({ title, type, content, id, timestamp });

  return (
    <Card>
      <Title level={4}>{title}</Title>
      <Title level={3}>{type}</Title>
      {Object.entries(JSON.parse(content)).map((record:any) => {
        return (
          <div key={record[0]}>
            <span>
              {record[0]}: {record[1]}
            </span>
          </div>
        );
      })}
    </Card>
  );
};

export default Answer;
