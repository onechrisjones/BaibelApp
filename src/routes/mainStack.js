import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Navigation from '~/components/common/navigation/Navigation';
import ReadRoutes from '~/components/screens/read/routes';
import FileNavigatorRoutes from '~/components/screens/navigator/routes';
import CONSTANTS from '~/utils/CONSTANTS';

const ApplicationTabs = createMaterialTopTabNavigator(
  {
    [CONSTANTS.ROUTES.READ_TAB]: {
      screen: ReadRoutes,
    },

    [CONSTANTS.ROUTES.LISTEN_TAB]: {
      screen: FileNavigatorRoutes,
    },
  },
  {
    tabBarComponent: ({ navigationState, navigation }) => (
      <Navigation navigationState={navigationState} navigation={navigation} />
    ),
    initialRouteName: CONSTANTS.ROUTES.READ_TAB,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: false,
  },
);

export default ApplicationTabs;
