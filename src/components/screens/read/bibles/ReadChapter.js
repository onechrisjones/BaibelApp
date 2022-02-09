import React from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import ScreenTitle from '~/components/common/ScreenTitle';
import HTML from '~/components/common/html';

const ItemContainer = styled(ScrollView)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Chapter = ({ navigation }) => {
  const chapterLabel = navigation.getParam('chapterLabel');
  const bibleName = navigation.getParam('bibleName');
  const contents = navigation.getParam('contents');
  return (
    <ItemContainer>
      <ScreenTitle title={`${bibleName} - ${chapterLabel}`} />
      <HTML>{contents}</HTML>
    </ItemContainer>
  );
};

export default Chapter;
