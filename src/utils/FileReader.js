import RNFS from 'react-native-fs';
import FileTree from '../tree.json';

export const getAssetsByPath = async path => {
  const search = FileTree;

  const navPaths = path.split('/').filter(p => !!p);

  const nestedSearch = navPaths.reduce(
    ([currentPath, items], pathItem, currentIndex) => {
      const searchLength = navPaths.length;

      const newPath = `${currentPath}/${pathItem}`;
      const newChildren = items.find(item => item.path === newPath).children;

      if (currentIndex + 1 === searchLength) {
        return newChildren;
      }

      return [newPath, newChildren];
    },
    ['static', search],
  );

  return nestedSearch;
};

export const getAssetByPath = async absolutePath => {
  const file = await RNFS.readFileAssets(absolutePath);
  return file;
};
