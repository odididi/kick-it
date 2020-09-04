import React from 'react';
import styled from 'styled-components';
import {Input, MultilineInput} from 'components/atoms';
import {palette} from 'styles/theme';

const AddChannelContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transition: height 0.2s ease;
`;

interface OverlayProps {
  expanded: boolean;
}

const Overlay = styled.div`
  width: 100%;
  background: ${(p: OverlayProps) => p.expanded ? palette.black : 'transparent'};
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 190;
  transform: scaleY(${(p: OverlayProps) => p.expanded ? 0 : 1});
  transform-origin: bottom;
`;

interface AddChannelProps {
  expanded: boolean;
  channelName: string;
  onChannelNameUpdate: React.Dispatch<React.SetStateAction<string>>;
  channelDescription: string;
  onChannelDescriptionUpdate: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
}

const AddChannel: React.FC<AddChannelProps> = ({
  expanded,
  channelName,
  onChannelNameUpdate,
  channelDescription,
  onChannelDescriptionUpdate,
  error
}) => {
  const inputRef = React.useRef(document.createElement('input'));
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChannelNameUpdate(e.target.value)}
            style={{margin: '16px 0 0'}}
          />
          <MultilineInput
            label="Description"
            placeholder="Enter channel description..."
            rows={3}
            value={channelDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChannelDescriptionUpdate(e.target.value)}
            style={{margin: '16px 0 8px'}}
          />
        </div>
      )}
    </AddChannelContainer>
  )
}

export default AddChannel;
