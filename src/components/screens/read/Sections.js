import React from 'react';
import Splash from 'react-native-splash-screen';
import { View } from 'react-native';
import styled from 'styled-components';
import ScreenTitle from '~/components/common/ScreenTitle';
import SectionItem from './SectionItem';
import CONSTANTS from '~/utils/CONSTANTS';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const ContentWrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const SECTIONS = [
  {
    route: CONSTANTS.ROUTES.BIBLE_LIST,
    title: 'Bibles',
    image: require('../../../img/bible.jpg'),
  },
  {
    route: CONSTANTS.ROUTES.LESSON_FOLDERS,
    title: 'Lessons',
    image: require('../../../img/lessons.jpg'),
  },
];

const Sections = ({ navigation }) => {
  React.useEffect(() => {
    Splash.hide();
  }, []);

  return (
    <Wrapper>
      <ScreenTitle title="Read" />
      <ContentWrapper>
        {SECTIONS.map(option => (
          <SectionItem
            onPressItem={() => {
              navigation.navigate(option.route);
            }}
            image={option.image}
            title={option.title}
            key={option.title}
          />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Sections;
