import styled from 'styled-components';

const Base = styled.div`
  white-space: pre-line;
  font-family: AvenirNext, HelveticaNeue, Helvetica, sans-serif;
`;

export const Hero = styled(Base)`
  margin-bottom: 46px;
  font-size: 52px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.primary};
`;

export const Title = styled(Base)`
  margin-bottom: 32px;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 0.6px;
  font-weight: 300;
  color: ${({ theme }) => theme.primary};
`;

export const Subtitle = styled(Base)`
  margin-bottom: 26px;
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 0.2px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

export const SectionHead = styled(Base)`
  margin-bottom: 19px;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.2px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

export const Body = styled(Base)`
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
`;

export const SmallBody = styled(Body)`
  font-size: 10px;
`;

export const BodyFaded = styled(Body)`
  color: ${({ theme }) => theme.secondary};
`;

export const BodyHighlight = styled(Body)`
  font-weight: 500;
`;
