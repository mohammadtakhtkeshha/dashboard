import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {StyledLoadingBox} from 'assets/js/partials/loading';

export default function LoadingComponent({loading}) {
  return (
    <StyledLoadingBox loading={loading}>
      <CircularProgress />
    </StyledLoadingBox>
  );
}
