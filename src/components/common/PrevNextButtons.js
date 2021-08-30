import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';
import appStyles from '~/styles';

const ButtonsWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('5%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Button = styled(TouchableOpacity)`
  width: 35%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TextStyle = styled(Text)`
  margin-right: ${({ withMarginRight, theme }) =>
    withMarginRight ? theme.metrics.smallSize : 0}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4.5%')}px;
  font-family: CircularStd-Bold;
  color: white;
  text-align: center;
`;

const DefaultText = ({ withMarginRight, color, text }) => (
  <TextStyle withMarginRight={withMarginRight} color={color}>
    {text}
  </TextStyle>
);

const renderControlButtons = ({
  activeRoute,
  onPressPrevious,
  onPressNext,
  length,
}) => {
  const activeIndex = activeRoute - 1;
  const showNext = length - activeIndex > 1;
  return (
    <ButtonsWrapper>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        {activeRoute > 1 && (
          <Button onPress={onPressPrevious}>
            <DefaultText text="PREV" color={appStyles.colors.darkText} />
          </Button>
        )}
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        {showNext && (
          <Button onPress={onPressNext}>
            <DefaultText text="NEXT" color={appStyles.colors.darkText} />
          </Button>
        )}
      </View>
    </ButtonsWrapper>
  );
};

const BottomContent = props => renderControlButtons({ ...props });

export default BottomContent;
