import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import isEqualsOrLargestThanIphoneX from '~/utils/isEqualsOrLargestThanIphoneX';
import NavigationBarItem from './NavigationBarItem';

const Wrapper = styled(View).attrs(({ theme }) => ({
  borderTopColor: theme.colors.secondaryColor,
  borderTopRightRadius: 1,
  borderTopWidth: 1,
}))`
  width: 100%;
  height: ${({ theme }) =>
    theme.metrics.getWidthFromDP('18%') +
    (isEqualsOrLargestThanIphoneX() ? 30 : 0)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: ${isEqualsOrLargestThanIphoneX() ? 30 : 0}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const NavigationBar = ({ onSelectStackRoute, stackRouteSelected, items }) => (
  <Wrapper>
    {items.map((item, index) => (
      <NavigationBarItem
        {...item}
        onPressItem={() => onSelectStackRoute(item.route)}
        isSelected={stackRouteSelected === index}
        key={item.label}
      />
    ))}
  </Wrapper>
);
export default NavigationBar;
