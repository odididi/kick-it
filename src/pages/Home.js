import React from 'react';
import {withRouter, Redirect} from 'react-router';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {WebSocketContext} from '../socketContext';
import {Button} from '@material-ui/core';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #0c1113;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const ContentContainer = styled.div`
  width: 80%;
  max-width: 1024px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  height: 400px;
  width: 600px;
  background-image: url('assets/kickit.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`

const UsernameInput = styled(({...rest}) => (
  <TextField
    classes={{
      root: 'root',
    }}
    {...rest}
  />
))`
  &.root {
    & > label {
      color: #ffed00;
    }
    & > div {
      & > fieldset {
        border-color: #ffed00 !important;
      }
      & > input {
        color: #ffed00;
      }
    }
    width: 300px;
  }
`;

const ChatButton = styled(({...rest}) => (
  <Button classes={{root: 'root', disabled: 'disabled'}} {...rest} />
))`
  &.root {
    margin-top: 24px;
    background-color: #ffed00;
    width: 300px;
    height: 56px;
    &:hover {
      background-color: rgba(255, 237, 0, 0.85);
    }
  &.disabled {
    background-color: rgba(255, 237, 0, 0.4);
  }
  }
`;

const Home = ({history}) => {
  const {activeUsername, setActiveUsername} = React.useContext(WebSocketContext);
  const inputRef = React.useRef();
  React.useEffect(() => {
    if(!inputRef) return;
    inputRef.current.focus();
  }, [inputRef]);
  return (
    <Container
      onKeyPress={e =>
        e.key === "Enter" &&
        activeUsername.length > 0 &&
        history.push('/chat')}
    >
      <ContentContainer>
        <Logo />
        <UsernameInput
          inputRef={inputRef}
          id="outlined-basic"
          label="Username"
          placeholder="Choose your username..."
          variant="outlined"
          color="primary"
          value={activeUsername}
          onChange={e => setActiveUsername(e.target.value)}
        />
        <ChatButton
          color="secondary"
          disabled={activeUsername.length === 0}
          onClick={() => history.push('/chat')}
        >
          Start chatting!
        </ChatButton>
      </ContentContainer>
      </Container>
  );
};

export default withRouter(Home);
