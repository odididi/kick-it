import React from 'react';
import styled from 'styled-components';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';

interface CustomInputProps {
  noBorder?: boolean;
  inputColor?: string;
}

export const Input = styled(({...rest}: TextFieldProps & CustomInputProps) => (
  <TextField
    classes={{
      root: "root",
    }}
    error={rest.error}
    variant="outlined"
    {...rest}
  />
))`
  &.root {
    & > label {
      color: #DECF17;
    }
    & > div {
      & > fieldset {
        ${p => p.noBorder && 'border: none'};
        border-color: ${(p) => (p.error ? "#f44336" : "#DECF17")} !important;
      }
      & > input {
        padding: 16px 12px;
        color: ${p => p.inputColor || '#DECF17'};
      }
      & > textarea {
        color: green;
      }
    }
    width: 260px;
  }
`;

export const MultilineInput: React.FC<TextFieldProps & CustomInputProps> = ({noBorder, ...rest}) => (
  <Input multiline noBorder={noBorder} {...rest} />
);