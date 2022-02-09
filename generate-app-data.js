const dirTree = require('directory-tree');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const fsExtra = require('fs-extra');

const RAW_DIR = './android/app/src/main/res/raw';

const tree = dirTree('./static');

const stripSpecialChars = str => str.replace(/[^a-zA-Z0-9_. ]/g, '');

const parseNumber = text => {
  const parse = text.name.split(' ');
  const value = parse[2] || parse[1] || parse[0];
  const stripped = stripSpecialChars(value);
  return stripped.replace('.mp3', '');
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
        const mdContents = sanitizeHtml(
          fs.readFileSync(currentItem.path, 'utf8'),
        );

        return [
          ...formattedItems,
          {
            ...currentItem,
            // eslint-disable-next-line no-control-regex
            contents: `${mdContents.replace(/[^\x00-\x7F]/g, '')}`,
          },
        ];
      }
      if (currentItem.extension === '.mp3') {
        const formatName = `audio_${stripSpecialChars(currentItem.name)
          .replace(/\s+/g, '_')
          .replace('-', '_')
          .replace(/'/g, '')
          .toLowerCase()}`;

        fs.copyFileSync(currentItem.path, `${RAW_DIR}/${formatName}`);

        return [...formattedItems, { ...currentItem, name: formatName }];
      }
      return [...formattedItems, currentItem];
    }, []);

  return nestedSearch(search);
};

fsExtra.ensureDirSync(RAW_DIR);
fsExtra.emptyDirSync(RAW_DIR);

const results = readMDFiles();

fs.writeFileSync('./src/tree.json', JSON.stringify(results));
