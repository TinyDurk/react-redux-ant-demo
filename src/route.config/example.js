import AsyncComponent from '@/components/common/AsyncComponent';

export default {
  name: 'example',
  layout: AsyncComponent(() => import('@/layouts/BasicLayout/BasicLayout')),
  path: 'example',
  icon: 'form',
  children: [
    {
      name: 'list',
      // hidden: true,
      component: AsyncComponent(() => import('@/containers/Example/List')),
      path: 'list',
    }, {
      name: 'detail',
      // hidden: true,
      component: AsyncComponent(() => import('@/containers/Example/Detail')),
      path: 'detail',
    }, {
      name: 'analysis',
      hidden: true,
      component: AsyncComponent(() => import('@/containers/Example/Analysis')),
      path: 'analysis-:id',
    }
  ],
};
