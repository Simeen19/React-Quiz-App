import React from 'react';

const AnswerOptions = ({ options, onSelect }) => {
  return React.createElement(
    'div',
    { style: { marginTop: '1rem' } },
    options.map((option, index) =>
      React.createElement(
        'button',
        {
          key: index,
          onClick: () => onSelect(option),
          style: {
            display: 'block',
            margin: '0.5rem 0',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
          },
        },
        option
      )
    )
  );
};

export default AnswerOptions;
