import express from 'express';

const router = express.Router();

/* const GRAY_EXPIRE_TIME_MS = 1000 * 3600 * 24 * 365 * 2;

function pickGrayCard(res) {
  const grayCard = Math.floor(Math.random() * 100 + 100);
  res.cookie('card', grayCard, { maxAge: GRAY_EXPIRE_TIME_MS });
} */

router.get(/(.*)?/, (req, res) => {
  console.log('enter: ', req.url);

  return res.render('home', {
    root: '<span>...</span>',
    state: '{}',
  });
});


export default router;
