import AsyncComponent from '@/components/common/AsyncComponent';

export default {
  name: '用户',
  hidden: true,
  layout: AsyncComponent(() => import('@/layouts/UserLayout/UserLayout')),
  path: 'user',
  children: [
    {
      name: 'login',
      hidden: true,
      disableCheckLogin: true,
      component: AsyncComponent(() => import('@/containers/User/Login')),
      path: 'login',
    },
  ],
};
