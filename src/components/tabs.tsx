import React from "react";
import { Tabs, Badge } from "antd";
import { useStorage } from "@plasmohq/storage/hook";
import Settings from "./settings";
import Bombs from "./bombs";
import Answers from "./answers";

const CustomTabs = () => {
  const [unreadAnswers, setUnreadAnswers] = useStorage("unreadAnswers", 0);

  const items = [
    {
      label: (
        unreadAnswers === 0 ? 
        "Answers" :
        <Badge count={unreadAnswers}>
          Answers
        </Badge>
      ),
      key: "1",
      children: <Answers />,
    },
    {
      label: "Settings",
      key: "2",
      children: <Settings />,
    },
    {
      label: "About",
      key: "3",
      children: "Boost your WhatsApp with Boom! Summarize chats, email meetings, and get message suggestions. Powered by GPT",
    },
    {
      label: "Bombs",
      key: "4",
      children: <Bombs />,
    },
  ];

  const handleTabClicked = (e) => {
    console.log(e);
    if (e === "1") {
      setUnreadAnswers(0);  
    }
    
  };

  return (
    <Tabs defaultActiveKey="4" items={items} onTabClick={handleTabClicked} />
  );
};

export default CustomTabs;
