import React from 'react';
import styled from 'styled-components';

import { Container } from '../components';
import { devices } from '../styles';
import { routes } from '../constants';

const InstagramImg = require('../../static/instagram.png');
const FacebookImg = require('../../static/facebook.png');

/* Footer Style */
const FooterWrapper = styled.div`
    backgroundColor: ${props => props.theme.secondary};
`;

const HomeFooter = styled.footer`
    position: relative;
    display: flex;
    padding: 1rem;
    alignContent: space-between;
    alignItems: center;
    flexWrap: wrap;
`;

const Text = styled.h2`
    color: white;
    fontSize: 12px;
    marginBottom: 0;
    textAlign: left;
    flex: 1;
    textAlign: center;
    minWidth: 100%;
    order: 1;

    ${devices.tablet`
        textAlign: left;
        textIndent: 50px;
        minWidth: 0;
        order: 0;
    `};
`;

const Flexer = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    justifyContent: center;
    minWidth: 100%;

    ${devices.tablet`
        textAlign: left;
        minWidth: 0;

        ${props => (props.right ? 'justifyContent: flex-end;' : '')}
    `};
`;

const Img100 = styled.img`
    height: 100%;
    margin: auto;
`;

const ImgButtonWrapper = styled.div`
    height: 20px;
    width: 20px;
    margin: 5px;
    textAlign: center;
    display: block;
`;

const ImgButton = props => (
    <ImgButtonWrapper>
        <a href={props.href}>
            <Img100 {...props} />
        </a>
    </ImgButtonWrapper>
);

class Footer extends React.Component {
    render() {
        return (
            <div>
                {window.location.pathname == routes.SUBSCRIBE ? null : (
                    <FooterWrapper id="asdfFooter">
                        <Container>
                            <HomeFooter>
                                <Flexer>
                                    <ImgButton
                                        src={FacebookImg}
                                        alt="Facebook"
                                        align="middle"
                                        href="https://www.facebook.com/KTPalpha"
                                    />
                                    <ImgButton
                                        src={InstagramImg}
                                        alt="Instagram"
                                        align="middle"
                                        href="https://www.instagram.com/ktpumich"
                                    />
                                </Flexer>
                                <Text>© Kappa Theta Pi 2018</Text>
                            </HomeFooter>
                        </Container>
                    </FooterWrapper>
                )}
            </div>
        );
    }
}

export default Footer;
