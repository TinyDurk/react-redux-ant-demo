/*
 * @Author: Burning
 * @Date: 2018-09-20 19:14:09
 * @Last Modified by: Burning
 * @Last Modified time: 2018-11-20 10:32:20
 */

import { schema } from 'normalizr';

const exampleSchema = new schema.Entity('example', {}, {
  idAttribute: 'id',
});

export default {
  EXAMPLE_SCHEMA: [exampleSchema]
};
