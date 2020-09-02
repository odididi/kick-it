import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Input = styled(({...rest}) => (
  <TextField
    classes={{
      root: 'root',
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
        border-color: ${p => p.error ? '#f44336' : '#ffed00'} !important;
      }
      & > input {
        color: #ffed00;
      }
      & > textarea {
        color: #ffed00;
      }
    }
    width: 300px;
  }
`;

export const MultilineInput = ({rows, ...rest}) => <Input multiline rows={rows} maxRows={rows} {...rest} />
