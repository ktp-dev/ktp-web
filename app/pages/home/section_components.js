import styled from 'styled-components';
import { devices } from '../../styles';

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: calc(100% - 60px);
    maxWidth: 1200px;
    margin: 0 auto;

    z-index: 98;

    ${devices.tablet`
        width: calc(100% - 100px);
    `} ${devices.desktop`
        width: calc(100% - 140px);
    `} ${devices.giant`
        width: calc(100% - 160px);
    `};
`;

const SectionHeader = styled.h2`
    fontsize: 42px;
    color: ${props => props.theme.highlight};
    texttransform: uppercase;
    text-align: center;
    fontweight: 500;
    textalign: center;

    ${devices.small`
    fontSize: 48px;
    `};
`;

const SectionBody = styled.p`
    color: white;
    fontsize: 16px;
    max-width: 600px;
`;

const Brick = styled.div`
    width: 100px;
    height: 12px;
    background: ${props => props.theme.highlight};
`;

export { CenteredContainer, SectionHeader, SectionBody, Brick };
