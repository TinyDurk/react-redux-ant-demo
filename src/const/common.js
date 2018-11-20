export const COURSE_PLAN = {
  ALL: {
    VAL: 1,
    LABEL: '全部'
  },
  UNSTART: {
    VAL: 3,
    LABEL: '待开课'
  },
  UNDERWAY: {
    VAL: 2,
    LABEL: '上课中'
  },
  FINISHED: {
    VAL: 4,
    LABEL: '已结课'
  }
};

export const SURVEY_TYPE = {
  ALL: {
    VAL: 0,
    LABEL: '全部',
  },
  SATISFY_SURVEY: {
    VAL: 1,
    LABEL: '满意度问卷',
  },
  TEST_SURVEY: {
    VAL: 2,
    LABEL: '测试问卷',
  },
};
export const SURVEY_TYPE_INVERSE = {
  0: '全部',
  1: '满意度问卷',
  2: '测试问卷',
};

export const COURSE_CATEGORY = {
  ALL: {
    VAL: 0,
    LABEL: '全部',
  },
  PHOTOGRAPHIC: {
    VAL: 1,
    LABEL: '摄影课',
  },
  DRAW: {
    VAL: 2,
    LABEL: '绘画课',
  },
};
export const COURSE_CATEGORY_INVERSE = {
  0: '全部',
  1: '摄影课',
  2: '绘画课',
};

export const SURVEY_STATUS = {
  ALL: {
    VAL: 0,
    LABEL: '全部',
  },
  DRAFT: {
    VAL: 1,
    LABEL: '草稿',
  },
  PUbLISH: {
    VAL: 2,
    LABEL: '已发布',
  },
  DISCARDED: {
    VAL: 3,
    LABEL: '已废弃',
  },
};
export const SURVEY_STATUS_INVERSE = {
  0: '全部',
  1: '草稿',
  2: '已发布',
  3: '已废弃',
};

// TODO: 后续用接口里返回的，要去掉
export const COURSE_TYPE = {
  0: '全部',
  1: '摄影入门班',
  2: '摄影vip五期班',
  3: '摄影提高班',
  4: '摄影进阶班',
  5: '摄影后期班',
  6: '摄影后期提高班',
  7: '摄影大师进修班',
  8: '摄影静物班',
  9: '摄影体验班',
  100: '绘画零基础班',
  101: '绘画初级班',
  102: '绘画中级班',
  103: '绘画高级班',
  104: '绘画进阶班',
  105: '绘画综合班',
  106: '绘画课五期班',
  107: '绘画体验班',
};

export const QUESTION_TYPE_REAL = {
  SINGLE_CHOICE_QUESTION: {
    name: '单选题',
    value: 1,
  },
  MULTIPLE_CHOICE_QUESTION: {
    name: '多选题',
    value: 2,
  },
  ANSWER_QUESTION: {
    name: '问答题',
    value: 3,
  },
  NPS_QUESTION: {
    name: 'NPS题',
    value: 4,
  },
};
export const QUESTION_TYPE_INVERSE = {
  1: '单选题',
  2: '多选题',
  3: '问答题',
  4: 'NPS题'
};

export const TEACHER_ROLE = {
  ALL: 0,
  PHOTO: 1,
  DRAW: 2
};
