import React from 'react';
import { useDispatch } from 'react-redux';
import CONSTANTS from '~/utils/CONSTANTS';
import { Creators as PlayerCreators } from '~/store/player';
import { getAssetsByPath } from '~/utils/FileReader';
import List from '../read/components/List';

const Folders = ({ navigation }) => {
  const dispatch = useDispatch();
  const path = navigation.getParam('path');
  const [list, setList] = React.useState([]);

  const fetch = async () => {
    const items = await getAssetsByPath(path);
    setList(items);
  };

  React.useEffect(() => {
    fetch();
  }, [path]);

  const onItemPress = item => {
    if (item.extension === '.mp3') {
      dispatch(
        PlayerCreators.setActiveAudio({
          activePlayList: list,
          activeAudio: item.name,
          category: path,
        }),
      );
      navigation.push(CONSTANTS.ROUTES.PLAYER);
    } else {
      navigation.push(CONSTANTS.ROUTES.FOLDER_LIST, {
        path: `${path}/${item.name}`,
      });
    }
  };

  return <List data={list} onItemPress={onItemPress} />;
};

export default Folders;
