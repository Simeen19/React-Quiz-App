// src/components/AnswerOptions.tsx
import React from 'react';

type AnswerOptionsProps = {
  options: string[];
  onSelect: (option: string) => void;
};

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, onSelect }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          style={{
            display: 'block',
            margin: '0.5rem 0',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
