import React, { Fragment } from 'react';
import NavigationBar from './components/navigation-bar/NavigationBar';
import PlayerTracker from './components/PlayerTracker';
import CONSTANTS from '~/utils/CONSTANTS';

const navigationBarItems = [
  {
    label: 'Read',
    icon: 'book-open-variant',
    route: CONSTANTS.ROUTES.READ_TAB,
  },
  {
    label: 'Listen',
    icon: 'volume-high',
    route: CONSTANTS.ROUTES.LISTEN_TAB,
  },
];

const onSelectStackRoute = (navigation, route) => navigation.navigate(route);

const Navigation = ({ navigationState, navigation }) => {
  const { index, routes } = navigationState;
  const routeSelected = routes[index];

  const nameRouteSelected = routeSelected.routes[routeSelected.index].routeName;
  const isShowingPlayerScreen = nameRouteSelected === CONSTANTS.ROUTES.PLAYER;

  return (
    <Fragment>
      {!isShowingPlayerScreen && (
        <Fragment>
          <PlayerTracker navigation={navigation} />
          <NavigationBar
            onSelectStackRoute={route => {
              onSelectStackRoute(navigation, route);
            }}
            stackRouteSelected={index}
            items={navigationBarItems}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Navigation;
