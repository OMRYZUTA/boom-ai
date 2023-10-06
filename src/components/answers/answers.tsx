import { useStorage } from "@plasmohq/storage/hook";
import CalendarAnswer from "./calendar-answer";
import SummaryAnswer from "./summary-answer";
import SuggestionAnswer from "./suggestion-answer";
const componentFactory = {
  'meeting': CalendarAnswer,
  'task': SummaryAnswer,
  'suggestion': SuggestionAnswer,

};

const renderAnswerComponent = (answer: any, index: number) => {
  const { summary_type, content, timestamp, id } = answer;
  const title = content?.title;
  
  const Answer = componentFactory[summary_type] || SummaryAnswer; // Fallback to SummaryAnswer if no match
  
  return <Answer key={index} title={title} type={summary_type} content={content} timestamp={timestamp} id={id} />;
};


const Answers = () => {
  const [answers, setAnswers] = useStorage("answers", (v) => v === undefined ? [] : v);
  console.log(answers);

  return (
    <>
      {answers.map((answer: any, index: number) => renderAnswerComponent(answer, index))}
    </>
  );
};

export default Answers;
