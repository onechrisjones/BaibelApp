import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import ProgressiveImage from '~/components/common/ProgressiveImage';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-content: center;
`;

const ImageContainer = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('35%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  align-self: center;
`;

const PodcastImage = () => (
  <Wrapper>
    <ImageContainer>
      <ProgressiveImage />
    </ImageContainer>
  </Wrapper>
);

export default PodcastImage;
