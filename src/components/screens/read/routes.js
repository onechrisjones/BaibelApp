import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import Bibles from './bibles/Bibles';
import BibleBooks from './bibles/BibleBooks';
import BibleBookChapters from './bibles/BibleBookChapters';
import ReadChapters from './bibles/ReadChapters';
import LessonFolders from './lessons/LessonFolders';
import LessonList from './lessons/LessonList';
import ReadLesson from './lessons/ReadLesson';
import Sections from './Sections';
import { getDefaultHeaderWithTitle } from '~/routes/utils/navigationOptions';
import CONSTANTS from '~/utils/CONSTANTS';

const RootStack = createStackNavigator(
  {
    [CONSTANTS.ROUTES.READ]: {
      screen: props => <Sections {...props} />,
      navigationOptions: () => ({
        headerBackTitle: null,
        header: null,
      }),
    },
    [CONSTANTS.ROUTES.BIBLE_LIST]: {
      screen: Bibles,
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle('Bibles', navigation, screenProps),
    },
    [CONSTANTS.ROUTES.BIBLE_BOOKS]: {
      screen: BibleBooks,
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle(
          navigation.getParam('bibleName', 'Chapters'),
          navigation,
          screenProps,
        ),
    },
    [CONSTANTS.ROUTES.BIBLE_BOOK_CHAPTERS]: {
      screen: BibleBookChapters,
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle(
          navigation.getParam('bibleName', 'Bible Chapter'),
          navigation,
          screenProps,
        ),
    },
    [CONSTANTS.ROUTES.READ_CHAPTERS]: {
      screen: ReadChapters,
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle(
          navigation.getParam('bibleName', 'Read'),
          navigation,
          screenProps,
        ),
    },

    [CONSTANTS.ROUTES.LESSON_FOLDERS]: {
      screen: LessonFolders,
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle('Lessons', navigation, screenProps),
    },
    [CONSTANTS.ROUTES.LESSONS_LIST]: {
      screen: LessonList,
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle(
          navigation.getParam('folderName', 'Lessons'),
          navigation,
          screenProps,
        ),
    },
    [CONSTANTS.ROUTES.READ_LESSON]: {
      screen: ReadLesson,
      navigationOptions: ({ navigation, screenProps }) =>
        getDefaultHeaderWithTitle(
          navigation.getParam('lessonName', 'Lesson'),
          navigation,
          screenProps,
        ),
    },
  },
  {
    initialRouteName: CONSTANTS.ROUTES.READ,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerLayoutPreset: 'center',
    headerMode: 'screen',
  },
);

RootStack.navigationOptions = ({
  navigation: {
    state: { routes, index },
  },
}) => {
  const { routeName } = routes[index];
  return {
    tabBarVisible: routeName === CONSTANTS.ROUTES.READ,
  };
};

export default RootStack;
