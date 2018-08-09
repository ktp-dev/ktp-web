// Generators
const generateBackgroundGradient = (angle) =>
  `linear-gradient(${angle}deg, rgba(256,256,256,1), rgba(111,195,129,1), rgba(41,128,185,1))`;

export default {
  // Fonts
  primaryFont: 'Source Sans Pro',
  headerFontSize: '50px',
  fontSize: '1.5em',
  // Colors
  primary: 'rgba(111,195,129,1)',
  secondary: 'rgba(41,128,185,1)',
  backgroundGradient: generateBackgroundGradient(0),
  // Generators
  generateBackgroundGradient,
};
