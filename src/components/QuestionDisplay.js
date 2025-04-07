import React from 'react';

const QuestionDisplay = ({ question }) => {
  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, question)
  );
};

export default QuestionDisplay;
