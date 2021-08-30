import React from 'react';
import CONSTANTS from '~/utils/CONSTANTS';
import { getAssetsByPath } from '~/utils/FileReader';
import List from '../components/List';

const LessonFolders = ({ navigation }) => {
  const [list, setList] = React.useState([]);

  const fetch = async () => {
    const folders = await getAssetsByPath('/read/lessons');
    setList(folders);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const onItemPress = item => {
    navigation.navigate(CONSTANTS.ROUTES.LESSONS_LIST, {
      folderName: item.name,
    });
  };

  return <List data={list} onItemPress={onItemPress} />;
};

export default LessonFolders;
