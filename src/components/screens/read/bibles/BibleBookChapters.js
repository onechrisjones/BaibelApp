import React from 'react';
import { getAssetsByPath } from '../../../../utils/FileReader';
import CONSTANTS from '~/utils/CONSTANTS';
import List from '../components/List';

const sort = (a, b) => {
  const bandA = parseInt(a.chapter);
  const bandB = parseInt(b.chapter);

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }

  return comparison;
};

const BibleBookChapters = ({ navigation }) => {
  const [list, setList] = React.useState([]);
  const chapter = navigation.getParam('chapter');
  const bibleName = navigation.getParam('bibleName');

  const fetch = async () => {
    const books = await getAssetsByPath(`/read/bibles/${bibleName}/${chapter}`);

    const processBooks = books
      .map(book => {
        const chapterNumber = parseInt(book.name.replace('.md', ''));
        return {
          ...book,
          value: book.name,
          chapterNumber,
          chapter: chapterNumber,
          name: `${chapter} - ${chapterNumber}`,
        };
      })
      .sort(sort);

    setList(processBooks);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const onItemPress = item => {
    navigation.navigate(CONSTANTS.ROUTES.READ_CHAPTERS, {
      bibleName,
      bibleBookName: chapter,
      chapter: item.value,
      chapterLabel: item.name,
      chapters: list,
      chapterNumber: item.chapterNumber,
    });
  };

  return <List data={list} onItemPress={onItemPress} />;
};

export default BibleBookChapters;
