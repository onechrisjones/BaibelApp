import React from 'react';
import { getAssetsByPath } from '../../../../utils/FileReader';
import CONSTANTS from '~/utils/CONSTANTS';
import List from '../components/List';

const LessonList = ({ navigation }) => {
  const [list, setList] = React.useState([]);
  const folderName = navigation.getParam('folderName');

  const fetch = async () => {
    const lessons = await getAssetsByPath(`/read/lessons/${folderName}`);

    const processLessons = lessons.map(lesson => ({
      ...lesson,
      name: lesson.name.replace('.html', ''),
    }));

    setList(processLessons);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const onItemPress = item => {
    navigation.navigate(CONSTANTS.ROUTES.READ_LESSON, {
      path: item.path,
      folderName,
      lessonName: item.name,
      contents: item.contents,
      lessons: list,
    });
  };

  return <List data={list} onItemPress={onItemPress} />;
};

export default LessonList;
