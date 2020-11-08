import React from 'react';
import {withRouter, Redirect, useHistory} from 'react-router';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {Input} from 'components/atoms';
import {AuthContext} from 'services/auth';
import {Channel} from 'components/organisms';
import {ChatContext, ChatContextProvider} from 'services/chat';

const Container = styled.div`
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

const ChatButton = styled(({...rest}) => (
  <Button classes={{root: 'root', disabled: 'disabled'}} {...rest} />
))`
  &.root {
    margin-top: 24px;
    background-color: #DECF17;
    width: 260px;
    height: 56px;
    &:hover {
      background-color: rgba(222, 207, 23, 0.85);
    }
  &.disabled {
    background-color: rgba(222, 207, 23, 0.25);
  }
  }
`;

const Chat: React.FC = () => {
  const history = useHistory();
  const [_username, _setUsername] = React.useState('');
  const [_usernameTaken, _setUsernameTaken] = React.useState(false);
  const {username, setUsername} = React.useContext(AuthContext);
  const {activeUsers} = React.useContext(ChatContext);
  const inputRef = React.useRef(document.createElement('input'));
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const login = () => {
    const usernames = activeUsers.map(u=>u.name)
    if (usernames.includes(_username)) {
      _setUsernameTaken(true);
      return;
    }
    setUsername(_username);
    sessionStorage.setItem('kickit_username', _username)
    history.push('/')
  }

  return username 
    ? (
      <ChatContextProvider>
        <Channel />
      </ChatContextProvider>
    ):(
      <Container onKeyPress={(e: React.KeyboardEvent)=> e.key === 'Enter' && login()}>
        <ContentContainer>
          <Input
            inputRef={inputRef}
            id="outlined-basic"
            label="Username"
            placeholder="Choose your username..."
            variant="outlined"
            value={_username}
            onChange={e => _setUsername(e.target.value)}
            error={_usernameTaken}
            helperText={_usernameTaken && "Username already taken! Choose another one!"}
            inputProps={{
              form: {
                autocomplete: 'off',
              },
            }}
          />
          <ChatButton
            color="secondary"
            disabled={_username.length === 0}
            onClick={login}
          >
            Start chatting!
          </ChatButton>
        </ContentContainer>
      </Container>
    );
};

export default Chat; 
