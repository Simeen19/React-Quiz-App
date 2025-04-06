import { jsx as _jsx } from "react/jsx-runtime";
const AnswerOptions = ({ options, onSelect }) => {
    return (_jsx("div", { style: { marginTop: '1rem' }, children: options.map((option, index) => (_jsx("button", { onClick: () => onSelect(option), style: {
                display: 'block',
                margin: '0.5rem 0',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
            }, children: option }, index))) }));
};
export default AnswerOptions;
