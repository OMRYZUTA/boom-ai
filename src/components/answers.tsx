import { useEffect } from "react";
import { Storage } from "@plasmohq/storage";
import { useStorage } from "@plasmohq/storage/hook";
import Answer from "./answer";

const storage = new Storage()
const Answers = () => {
    const [answers, setanswers] = useStorage("answers", (v) => v === undefined ? []: v)
    console.log(answers)
  return (
    <>
      {answers.map((answer: any, index) => (
        <Answer key={index} title={answer?.content?.title} type={answer.summary_type} content={answer.content} timestamp={answer.timestamp} id={answer.id} />
      ))}
    </>
  );
};

export default Answers;
