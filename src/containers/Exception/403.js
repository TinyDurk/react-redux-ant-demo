import React from 'react';
import { Link } from 'react-router';
import Exception from '@/components/common/Exception';

const Exception403 = () => (
  <Exception
    type="403"
    linkElement={Link}
  />
);

export default Exception403;
