import React from 'react';
import { Provider } from 'react-redux';
import SoundComponent from './components/common/SoundComponent';
import { ThemeContextProvider } from './ThemeContextProvider';
import ApplicationNavigator from './routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <ThemeContextProvider>
      <ApplicationNavigator />
      <SoundComponent />
    </ThemeContextProvider>
  </Provider>
);

export default App;
