import React from 'react';
import {withRouter, Redirect} from 'react-router';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import Page from '../atoms/Page';
import Input from '../atoms/Input';
import {AuthContext} from '../services/auth';

const Container = styled.div`
  /* padding: 24px; */
  height: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  height: 300px;
  width: 100%;
  background-image: url('/assets/kickit.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`

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
  const [_username, _setUsername] = React.useState('');
  const {username, setUsername} = React.useContext(AuthContext);
  const inputRef = React.useRef();
  React.useEffect(() => {
    if(!inputRef || username) return;
    inputRef.current.focus();
  }, [inputRef, username]);
  if (username) {
    return <Redirect to="/chat" />
  }
  return (
    <Page>
      <Container>
        <ContentContainer>
          <Logo />
          <Input
            inputRef={inputRef}
            id="outlined-basic"
            label="Username"
            placeholder="Choose your username..."
            variant="outlined"
            color="primary"
            value={_username}
            onChange={e => _setUsername(e.target.value)}
            inputProps={{
              form: {
                autocomplete: 'off',
              },
            }}
          />
          <ChatButton
            color="secondary"
            disabled={_username.length === 0}
            onClick={() => {
              setUsername(_username);
              localStorage.setItem('kickit_username', _username)
              history.push('/chat')
            }}
          >
            Start chatting!
          </ChatButton>
        </ContentContainer>
      </Container>
    </Page>
  );
};

export default withRouter(Home);
