import React from 'react';
import HeaderActionButton from '~/components/common/HeaderActionButton';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

export const DEFAULT_HEADER_STYLE = {
  headerBackTitle: null,
  headerTintColor: appStyles.colors.white,
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  titleStyle: {
    color: appStyles.colors.white,
  },
  headerTitleStyle: {
    fontSize: appStyles.metrics.navigationHeaderFontSize,
    fontFamily: 'CircularStd-Bold',
    fontWeight: undefined,
  },
};

export const getPlayerNavigationOption = () => {
  return {
    ...DEFAULT_HEADER_STYLE,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
  };
};

export const getDefaultHeaderWithTitle = (title, navigation, screenProps) => {
  const { theme } = screenProps;
  return {
    ...DEFAULT_HEADER_STYLE,
    headerTintColor: theme.colors.textColor,
    titleStyle: {
      color: theme.colors.textColor,
    },
    headerTransparent: false,
    headerStyle: {
      backgroundColor: theme.colors.secondaryColor,
      borderBottomWidth: 0,
      elevation: 0,
    },
    title,
  };
};

export const getDefaultHeaderWithButton = (
  navigation,
  screenProps,
  title,
  icon,
) => {
  const { params } = navigation.state;
  const { theme } = screenProps;

  const onPressHeaderButton = params && params[CONSTANTS.PARAMS.HEADER_ACTION];
  const headerWithTitleStyle = getDefaultHeaderWithTitle(
    title,
    navigation,
    screenProps,
  );

  return {
    ...headerWithTitleStyle,
    headerRight: (
      <HeaderActionButton
        color={theme.colors.textColor}
        onPress={onPressHeaderButton}
        icon={icon}
      />
    ),
  };
};

export const setHeaderPlayButtonPress = (playlist, navigation) => {
  const onPressPlayHeaderButton = () => {
    if (playlist.length > 0) {
      navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
        [CONSTANTS.PARAMS.PLAYER]: {
          [CONSTANTS.KEYS.PLAYLIST]: playlist,
        },
      });
    }
  };

  navigation.setParams({
    [CONSTANTS.PARAMS.HEADER_ACTION]: onPressPlayHeaderButton,
  });
};

export const getHiddenHeaderLayout = (screenProps, colorOverride) => {
  const { theme } = screenProps;

  return {
    ...DEFAULT_HEADER_STYLE,
    headerTintColor: colorOverride || theme.colors.textColor,
    headerBackTitle: null,
  };
};
