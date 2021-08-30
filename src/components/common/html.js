import React from 'react';
import HTML from 'react-native-render-html';
import { Text } from 'react-native';

const HTMLView = ({ children }) => {
  return (
    <HTML
      baseFontStyle={{
        color: 'white',
        fontSize: 24,
        fontFamily: 'CircularStd-Black',
      }}
      tagsStyles={{
        sup: { fontSize: 30 },
      }}
      source={{ html: children }}
      listsPrefixesRenderers={{
        ol: (_, __, ___, passProps) => {
          return <Text style={{ color: 'white' }}>{passProps.index + 1})</Text>;
        },
        ul: () => {
          return <Text style={{ color: 'white' }}>• </Text>;
        },
      }}
    />
  );
};

export default HTMLView;
