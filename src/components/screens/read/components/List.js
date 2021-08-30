import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import formatFileName from '~/utils/format-file-name';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const BibleList = styled(FlatList)`
  width: 100%;
  height: 100%;
  padding-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const BibleListItem = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.textColor};
`;

const List = ({ onItemPress, data }) => (
  <Wrapper>
    <BibleList
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onItemPress(item)}>
          <BibleListItem>{formatFileName(item.name)}</BibleListItem>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => `${item.name}`}
      data={data}
    />
  </Wrapper>
);

export default List;
