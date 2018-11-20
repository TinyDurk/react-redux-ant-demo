import AsyncComponent from '@/components/common/AsyncComponent';

export default {
  name: 'exception',
  hidden: true,
  path: 'exception',
  children: [
    {
      name: '403',
      component: AsyncComponent(() => import('@/containers/Exception/403')),
      path: '403',
    }, {
      name: '404',
      component: AsyncComponent(() => import('@/containers/Exception/404')),
      path: '404',
    }, {
      name: '500',
      component: AsyncComponent(() => import('@/containers/Exception/500')),
      path: '500',
    },
  ],
};
