import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import {
  getDefaultHeaderWithTitle,
  getPlayerNavigationOption,
} from '~/routes/utils/navigationOptions';
import Player from '~/components/common/player/PlayerContainer';
import Folders from './Folders';
import CONSTANTS from '~/utils/CONSTANTS';

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.FOLDER_LIST]: {
      screen: Folders,
      params: { path: '/listen/' },
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle('Listen', navigation, screenProps),
    },
    [CONSTANTS.ROUTES.PLAYER]: {
      screen: Player,
      navigationOptions: ({ navigation }) =>
        getPlayerNavigationOption(navigation),
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.FOLDER_LIST,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

export default RootStack;
