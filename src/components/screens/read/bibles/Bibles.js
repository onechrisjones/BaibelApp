import React from 'react';
import CONSTANTS from '~/utils/CONSTANTS';
import { getAssetsByPath } from '~/utils/FileReader';
import List from '../components/List';

const Bibles = ({ navigation }) => {
  const [list, setList] = React.useState([]);

  const fetchAvailableBooks = async () => {
    const books = await getAssetsByPath('/read/bibles/');
    setList(books);
  };

  React.useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const onItemPress = item => {
    navigation.navigate(CONSTANTS.ROUTES.BIBLE_BOOKS, {
      bibleName: item.name,
    });
  };

  return <List data={list} onItemPress={onItemPress} />;
};

export default Bibles;
