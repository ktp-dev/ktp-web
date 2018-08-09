import styled from 'styled-components';
import { h } from 'react-hyperscript-helpers';

import { PageContainer } from '../../ui';
import { LandingConn } from './landing';

const StyledPageContainer = styled(PageContainer)`
  overflow: hidden;
`;

export const HomePage = () => h(StyledPageContainer, [h(LandingConn)]);
