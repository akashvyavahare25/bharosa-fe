export let getMenuData: any[] = [
 
  {
    title: 'Home',
    key: 'Home',
    icon: 'fe fe-home',
    url: '/home',
    permission: ['-', 'superAdmin','user','superDataAdmin','admin'],
  },
 
  // {
  //   title: 'Define Parameter',
  //   key: 'parameter',
  //   icon: 'fe fe-database',
  //   permission: ['parameter', 'superAdmin'],
  //   children: [
  //     {
  //       title: 'Create',
  //       key: 'create',
  //       url: '/parameter/create',
  //       permission: ['parameter:create', 'superAdmin'],
  //     },
  //     {
  //       title: 'All',
  //       key: 'all',
  //       url: '/parameter/all',
  //       permission: ['parameter:all', 'superAdmin'],
  //     },
  //   ],
  // },
 
  {
    title: 'Define Screen',
    key: 'screen',
    icon: 'fe fe-monitor',
    permission: ['screen', 'superAdmin'],
    children: [
      {
        title: 'Create',
        key: 'create',
        url: '/screen/create',
        permission: ['screen:create', 'superAdmin'],
      },
      {
        title: 'All',
        key: 'all',
        url: '/screen/all',
        permission: ['screen:all', 'superAdmin'],
      },
    ],
  },
  // {
  //   title: 'Users Management',
  //   key: 'userManagement',
  //   icon: 'fe fe-user',
  //   url: '/user/list',
  //   permission: ['superAdmin', 'admin'],
  // },
]
