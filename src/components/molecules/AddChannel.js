import React from 'react';
import styled from 'styled-components';
import {Input, MultilineInput} from '../atoms/Input';
import {palette} from '../../styles/theme';

const AddChannelContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transition: height 0.2s ease;
`;

const Overlay = styled.div`
  width: 100%;
  background: ${p => p.expanded ? palette.black : 'transparent'};
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 190;
  transform: scaleY(${p => p.expanded ? 0 : 1});
  transform-origin: bottom;
`;

const AddChannel = ({
  expanded,
  channelName,
  onChannelNameUpdate,
  channelDescription,
  onChannelDescriptionUpdate,
  error
}) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (!inputRef || !expanded) return;
    inputRef.current.focus();
  }, [expanded, inputRef, error]);

  return (
    <AddChannelContainer style={{height: expanded ? 190 : 0}}>
      <Overlay expanded={expanded} />
      {expanded && (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Input
            inputRef={inputRef}
            label="Channel"
            placeholder="Enter channel name..."
            error={error && channelName === ''}
            value={channelName}
            onChange={e => onChannelNameUpdate(e.target.value)}
            style={{margin: '16px 0 0'}}
          />
          <MultilineInput
            label="Description"
            placeholder="Enter channel description..."
            rows={3}
            value={channelDescription}
            onChange={e => onChannelDescriptionUpdate(e.target.value)}
            style={{margin: '16px 0 8px'}}
          />
        </div>
      )}
    </AddChannelContainer>
  )
}

export default AddChannel;
