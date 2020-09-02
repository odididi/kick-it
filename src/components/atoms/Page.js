import React from 'react';
import useResize from '../../hooks/useResize';
import styled from 'styled-components';

const Container = styled.div`
  background: #0c1113;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const Page = ({children}) => {
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
