import React from 'react';
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskAdapter = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskAdapter(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000000000000-LLLL"
        definitions={{
          'L': {
            mask: /[a-zA-Z]/
          },
          '0': {
            mask: /[0-9]/,
          }
        }}
        inputRef={ref}
        onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
        overwrite={true}
      />
    );
  },
);

export default TextMaskAdapter; 