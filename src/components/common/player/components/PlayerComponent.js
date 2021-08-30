import React from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components';
import PodcastTextContent from './PodcastTextContent';
import BackgroundImage from './BackgroundImage';
import ProgressSlider from './ProgressSlider';
import PlayerControls from './PlayerControls';
import PodcastImage from './PodcastImage';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: space-between;
`;

const UpperSection = styled(View)`
  padding-top: ${({ theme }) => theme.metrics.getHeightFromDP('12%')}px;
`;

const PlayerComponent = ({
  seekActiveAudio,
  activeAudio,
  playPrevious,
  playNext,
  paused,
  category,
  pause,
  play,
}) => (
  <Wrapper>
    <StatusBar backgroundColor="#111" barStyle="light-content" animated />
    <BackgroundImage />
    <UpperSection>
      <PodcastImage />
      <PodcastTextContent title={activeAudio} category={category} />
      <ProgressSlider seekActiveAudio={seekActiveAudio} />
      <PlayerControls
        playPrevious={playPrevious}
        playNext={playNext}
        paused={paused}
        pause={pause}
        play={play}
      />
    </UpperSection>
  </Wrapper>
);

export default PlayerComponent;
