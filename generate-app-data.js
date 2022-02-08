const dirTree = require('directory-tree');
const fs = require('fs');

const tree = dirTree('./static');

const parseNumber = text => {
const parse = text.name.split(' ');
const value = parse[2] || parse[1] || parse[0];
return value.replace('.mp3', '');
};

const formatChildren = items => {
  return items.sort((a, b) => {
    if (a.name && b.name) {
      if (a.name.split(' ')[2]) {
        return parseInt(parseNumber(a)) > parseInt(parseNumber(b)) ? 1 : -1;
      }
    }

    return 1;
  });
};

const readMDFiles = () => {
  const search = tree.children;

  const nestedSearch = items =>
    items.reduce((formattedItems, currentItem) => {
      if (currentItem.name === '.DS_Store') {
        return formattedItems;
      }
      if (currentItem.children) {
        return [
          ...formattedItems,
          {
            ...currentItem,
            children: formatChildren(nestedSearch(currentItem.children)),
          },
        ];
      }
      if (currentItem.extension === '.html') {
        const mdContents = fs.readFileSync(currentItem.path, 'utf8');

        return [...formattedItems, { ...currentItem, contents: mdContents }];
      }
      if (currentItem.extension === '.mp3') {
        const formatName = `audio_${currentItem.name
          .replace(/\s+/g, '_')
          .replace('-', '_')
          .replace(/'/g, '')
          .toLowerCase()}`;

        fs.copyFileSync(
          currentItem.path,
          `./android/app/src/main/res/raw/${formatName}`,
        );

        return [...formattedItems, { ...currentItem, name: formatName }];
      }
      return [...formattedItems, currentItem];
    }, []);

  return nestedSearch(search);
};

const results = readMDFiles();

fs.writeFileSync('./src/tree.json', JSON.stringify(results));
