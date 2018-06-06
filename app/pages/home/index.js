import styled from 'styled-components';
import { h } from 'react-hyperscript-helpers';

import { PageContainer } from '../../components';
import Landing from './landing';

const StyledPageContainer = styled(PageContainer)`
  overflow: hidden;
`;

const HomePage = () => h(StyledPageContainer, [h(Landing)]);

export default HomePage;
