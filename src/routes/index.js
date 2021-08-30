import React from 'react';
import { createAppContainer } from 'react-navigation';
import { withTheme } from 'styled-components';
import MainStack from './mainStack';

const AppContainer = createAppContainer(MainStack);

const Main = ({ theme }) => <AppContainer screenProps={{ theme }} />;
export default withTheme(({ theme }) => <Main theme={theme} />);
