import React from 'react';
import CONSTANTS from '~/utils/CONSTANTS';
import { getAssetsByPath } from '~/utils/FileReader';
import List from '../components/List';

const BibleBooks = ({ navigation }) => {
  const [bookList, setBooks] = React.useState([]);
  const bibleName = navigation.getParam('bibleName');

  const fetchAvailableBooks = async () => {
    const books = await getAssetsByPath(`/read/bibles/${bibleName}`);
    setBooks(books);
  };

  React.useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const onItemPress = item => {
    navigation.navigate(CONSTANTS.ROUTES.BIBLE_BOOK_CHAPTERS, {
      bibleName,
      chapter: item.name,
    });
  };

  return <List data={bookList} onItemPress={onItemPress} />;
};

export default BibleBooks;
