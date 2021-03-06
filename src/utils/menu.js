module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '概览',
    router: '/dashboard',
  },
  {
    id: 2,
    name: '系统',
    icon: 'setting',
  },
  {
    id: 21,
    bpid: 2,
    mpid: 2,
    name: '管理员',
    icon: 'user',
    router: '/admin-user',
  },
  {
    id: 22,
    mpid: -1,
    bpid: 2,
    name: '管理员详情',
    router: '/admin-user/:id',
  },
  {
    id: 23,
    mpid: 2,
    bpid: 2,
    name: '管理组',
    icon: 'team',
    router: '/admin-group',
  },
  {
    id: 24,
    bpid: 2,
    mpid: 2,
    name: '权限',
    icon: 'solution',
    router: '/authory',
  },
  {
    id: 25,
    bpid: 2,
    mpid: 2,
    name: '配置',
    icon: 'setting',
    router: '/setting',
  },
  {
    id: 3,
    name: '内容',
    icon: 'file-text',
  },
  {
    id: 31,
    bpid: 3,
    mpid: 3,
    name: '分类',
    icon: 'filter',
    router: '/category',
  },
]
