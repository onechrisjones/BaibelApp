import React from 'react';
import { View } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator,
  NavigationActions,
} from 'react-navigation';
import ReadChapter from './ReadChapter';
import PrevNextButton from '~/components/common/PrevNextButtons';

let navigator;

const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const ReadChapters = ({ navigation }) => {
  const bibleName = navigation.getParam('bibleName');
  const contents = navigation.getParam('chapters');
  const firstChapter = navigation.getParam('chapterNumber');
  const [active, setActive] = React.useState(firstChapter);
  const pages = React.useMemo(() => {
    const obj = {};
    contents.forEach(content => {
      obj[`read-${content.chapterNumber}`] = {
        screen: ReadChapter,
        params: {
          ...content,
          bibleName,
          chapterLabel: content.chapter,
          contents: content.contents,
        },
      };
    });
    return obj;
  }, [contents]);

  const Stack = React.useMemo(() => {
    const Navigator = createAppContainer(
      createMaterialTopTabNavigator(pages, {
        initialRouteName: `read-${firstChapter}`,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
          style: { display: 'none' },
        },
        lazy: true,
      }),
    );

    const TabNavigator = () => (
      <Navigator
        ref={navigatorRef => {
          navigator = navigatorRef;
        }}
      />
    );

    const StackNav = createStackNavigator(
      {
        main: {
          screen: TabNavigator,
          navigationOptions: () => ({ header: null }),
        },
      },
      {
        initialRouteName: 'main',
        headerLayoutPreset: 'center',
        headerMode: 'screen',
      },
    );

    return createAppContainer(StackNav);
  }, [contents]);

  const handleNextPress = () => {
    const nextRoute = active + 1;
    setActive(nextRoute);
    navigate(`read-${nextRoute}`);
  };

  const handlePrevPress = () => {
    const nextRoute = active - 1;
    setActive(nextRoute);
    navigate(`read-${nextRoute}`);
  };

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <Stack />
      <PrevNextButton
        length={contents.length}
        activeRoute={active}
        onPressNext={handleNextPress}
        onPressPrevious={handlePrevPress}
      />
    </View>
  );
};

export default ReadChapters;
