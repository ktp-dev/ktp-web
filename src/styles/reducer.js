import Theme from './theme';

export const theme = (state = Theme, action) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};
