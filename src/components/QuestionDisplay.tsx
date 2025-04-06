import React from 'react';

type QuestionProps = {
  question: string;
};

const QuestionDisplay: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div>
      <h2>{question}</h2>
    </div>
  );
};

export default QuestionDisplay;
