import React from 'react';
import { Link } from 'react-router';
import Exception from '@/components/common/Exception';

const Exception500 = () => (
  <Exception
    type="500"
    linkElement={Link}
  />
);

export default Exception500;
