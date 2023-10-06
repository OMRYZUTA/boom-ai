import React from "react";
import { useState, useEffect } from "react";
import { Tabs, Badge } from "antd";
import { useStorage } from "@plasmohq/storage/hook";
import Settings from "./settings";
import Bombs from "./bombs/bombs";
import Answers from "./answers/answers";
const CustomTabs = () => {
  const [unreadAnswers, setUnreadAnswers] = useStorage("unreadAnswers", 0);
  const [storedUserName] = useStorage<string>("userName");
  const [storedUserEmail] = useStorage<string>("userEmail");
  const [userAbleToUse, setUserAbleToUse] = useState(!!(storedUserName && storedUserEmail))
  const [activeTab, setActiveTab] = useState("1")
  const items = [
    {
      label: "Bombs",
      key: "1",
      children: <Bombs />,
    },
    {
      label: (
        (unreadAnswers === 0 || activeTab === "2")  ? 
        "Answers" :
        <Badge count={unreadAnswers}>
          Answers
        </Badge>
      ),
      key: "2",
      children: <Answers />,
    },
    {
      label: "Settings",
      key: "3",
      children: <Settings />,
    },
    {
      label: "About",
      key: "4",
      children: "Boost your WhatsApp with Boom! Summarize chats, email meetings, and get message suggestions. Powered by GPT",
    },

  ];

  const handleTabClicked = (e) => {
    if (e === "2") {
      setUnreadAnswers(0);  
    }
  };
  useEffect(() => {
    setUserAbleToUse(!!(storedUserName && storedUserEmail))
    setActiveTab(userAbleToUse ? "1": "3")
  }, [storedUserEmail, storedUserName, userAbleToUse])
  if (userAbleToUse) {
    console.log({userAbleToUse})
    return <Tabs  defaultActiveKey={ activeTab} items={ items} onTabClick={handleTabClicked} />
  }
  else {
    console.log({userAbleToUse})
    return  <Tabs activeKey={activeTab} items={[items[2]]} onTabClick={handleTabClicked} />

  }
};

export default CustomTabs;
