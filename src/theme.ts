import {DefaultTheme, Theme} from 'react-native-paper';

// declare global {
//   namespace ReactNativePaper {
//     interface ThemeColors {
//       secondary: string;
//     }
//   }
// }

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#363636',
    accent: '#44d480',
    background: '#fff',
    surface: '#fff',
    error: '#B00020',
    text: '#333',
    disabled: '#bbb',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {fontFamily: 'Montserrat-SemiBold', fontWeight: '200'},
    medium: {fontFamily: 'Montserrat-Medium', fontWeight: '500'},
    light: {fontFamily: 'Montserrat-Regular', fontWeight: 'normal'},
    thin: {fontFamily: 'Montserrat-Light', fontWeight: 'normal'},
  },
};

//COLORS
// primary: #555
// accent: #44d480
// secondary: #bbb

// FONTS
// Lyrics: Enriquetta, sans-serif
// Other: 'Montserrat', "Helvetica Neue", Helvetica, Arial, sans-serif

export default theme;
