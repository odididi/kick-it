import React from 'react';
import styled from 'styled-components';
import {useResize} from 'hooks';

const Container = styled.div`
  background: black;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Page: React.FC = ({children}) => {
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const resizeTrigger = useResize();
  React.useEffect(() =>
    setWindowHeight(window.innerHeight)
  , [resizeTrigger]);
  return (
    <Container style={{minHeight: windowHeight}}>
      {children}
    </Container>
  )
}

export default Page;
