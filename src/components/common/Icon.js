import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { withTheme } from 'styled-components';

const Icon = ({ theme, color, name, size }) => (
  <MaterialCommunityIcons
    color={color || theme.colors.textColor}
    name={name}
    size={size}
  />
);

export default withTheme(Icon);
