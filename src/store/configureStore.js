/**
 * Created Date: Wednesday December 6th 2017
 * @Author: Burning
 * ------------------------------
 * Last Modified: Wednesday December 6th 2017 10:12 pm
 * Modified By: Burning
 * ------------------------------
 * Copyright (c) XFE
 */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
