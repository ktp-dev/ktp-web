import styled from 'styled-components';

const RoundedButton = styled.button`
    padding: 10px 0;
    borderradius: 20px;
    backgroundcolor: transparent;
    color: ${props => props.color};
    fontweight: 500;
    fontsize: 16px;
    padding: 8px 60px;
    border: 3px solid ${props => props.color};

    &:hover {
        backgroundcolor: ${props => props.color};
        color: white;
        ${props => props.hover};
    }
`;

export default RoundedButton;
