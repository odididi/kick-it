import React from 'react';
import styled from 'styled-components';
import {useResize} from 'hooks';

const Container = styled.div`
  background: #0c1113;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
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
