import React from 'react';
import { Link } from 'react-router';
import Exception from '@/components/common/Exception';

const Exception404 = () => (
  <Exception
    type="404"
    linkElement={Link}
  />
);

export default Exception404;
