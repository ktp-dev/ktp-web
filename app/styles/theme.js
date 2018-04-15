// Generators
function generateBackgroundGradient(angle, alpha) {
    return `-webkit-linear-gradient(${angle}deg, rgba(240,47,23,${alpha}) 0%, rgba(246,41,12,${alpha}) 0%, rgba(241,111,92,${alpha}) 0%, rgba(253,177,154,${alpha}) 0%, rgba(197,99,250,${alpha}) 100%)`;
}

// example use
export default {
    // Color primitives
    primaryFont: 'Montserrat',
    primary: '#1D3F59',
    secondary: '#6FC381',
    highlight: 'black',
    highlightSecondary: '#ebcdd1',
    success: '#2ecc71',
    backgroundGradient: generateBackgroundGradient(45, 1.0),
    reverseBackgroundGradient: generateBackgroundGradient(135, 1.0),

    gradientOverlay:
        '-webkit-linear-gradient(left, rgba(244,164,168,.2) 0%,rgba(199,102,245,.2) 100%)',

    // Font sizes
    headerFontSize: '50px',
    fontSize: '1.5em',

    // Generators
    generateBackgroundGradient
};
