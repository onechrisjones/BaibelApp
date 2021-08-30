import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styled, { withTheme } from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('20%')}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PodcastImage = styled(Image)`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.interestSelectedColor : theme.colors.darkLayer};
  border-radius: 4px;
`;

const InterestTitle = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.white};
`;

const ReadItem = ({ onPressItem, isSelected, image, title }) => (
  <Wrapper onPress={onPressItem}>
    <PodcastImage source={image} />
    <DarkLayer isSelected={isSelected}>
      <InterestTitle>{title}</InterestTitle>
    </DarkLayer>
  </Wrapper>
);

export default withTheme(ReadItem);
