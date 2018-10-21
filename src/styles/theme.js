// Generators
const generateBackgroundGradient = (angle) =>
  `linear-gradient(${angle}deg, rgba(0,256,256,1), rgba(111,195,129,1), rgba(41,128,185,1))`;

export default {
  // Fonts
  primaryFont: 'Open Sans',
  headerFontSize: '50px',
  fontSize: '1.5em',
  // Colors
  primary: '#404040',
  secondary: '#BBBBBB',
  highlight: '#FA5C57',
  red: '#FA5C57',
  green: '#6FC381',
  lavender: '#BE90D4',
  blue: '#59ABE3',
  yellow: '#FCB606',
  backgroundGradient: generateBackgroundGradient(0),
  // Generators
  generateBackgroundGradient,
};
