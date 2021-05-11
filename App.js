
import React from 'react';

import Login from './components/Login';
import { Provider as PaperProvider,DefaultTheme } from 'react-native-paper';


export default function App() {
  return (
    
    <PaperProvider theme={theme}>
   <Login/>
   </PaperProvider>
  );
}


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};
