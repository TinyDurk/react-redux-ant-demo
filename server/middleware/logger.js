import log4js from 'log4js';

const logger = log4js.getLogger();
log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: 'dateFile',
      filename: '/data/logs/node_log/',
      pattern: 'yyyyMMddHH.log',
      maxLogSize: 1024,
      alwaysIncludePattern: true,
      // backups: 4 //日志备份数量，大于该数则自动删除
      // category: 'normal' //这个破玩儿，加上就写不到文件中去了
    },
  ],
  replaceConsole: true,
});

export default logger;
