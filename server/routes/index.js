import fs from 'fs';
import path from 'path';
import express from 'express';

const router = express.Router();

/* eslint-disable */
fs.readdirSync(__dirname)
  .filter(filename => filename.indexOf('.js') > 0 && filename !== path.basename(__filename))
  .forEach(filename => {
    const subRouter = require(`./${filename}`);
    router.use(subRouter);
  });

export default router;
