import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';

import { PageContainer, PageHeading } from '@ktp/ui';
import { getTheme } from '@ktp/theme';

export const ProDevPageBase = ({ theme }) =>
  h(PageContainer, [
    h(PageHeading, {
      color: theme.lavender,
      title: 'Professional Development',
      subtitle: 'Be more professional',
    }),
  ]);

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const ProDevPage = connect(mapStateToProps)(ProDevPageBase);
