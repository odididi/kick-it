import React from 'react';
import styled from 'styled-components';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';

interface CustomInputProps {
  noBorder?: boolean;
}

export const Input = styled(({...rest}: TextFieldProps & CustomInputProps) => (
  <TextField
    classes={{
      root: "root",
    }}
    error={rest.error}
    variant="outlined"
    color="primary"
    {...rest}
  />
))`
  &.root {
    & > label {
      color: #ffed00;
    }
    & > div {
      & > fieldset {
        ${p => p.noBorder && 'border: none'};
        border-color: ${(p) => (p.error ? "#f44336" : "#ffed00")} !important;
      }
      & > input {
        color: #ffed00;
      }
      & > textarea {
        color: green;
      }
    }
    width: 300px;
  }
`;

export const MultilineInput: React.FC<TextFieldProps & CustomInputProps> = ({noBorder, ...rest}) => (
  <Input multiline noBorder={noBorder} {...rest} />
);