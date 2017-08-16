module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '概览',
    router: '/dashboard',
  },
  {
    id: 2,
    name: '管理',
    icon: 'user',
  },
  {
    id: 21,
    bpid: 2,
    mpid: 2,
    name: '用户',
    icon: 'solution',
    router: '/user',
  },
  {
    id: 22,
    mpid: -1,
    bpid: 2,
    name: '用户详情',
    router: '/user/:id',
  },
  {
    id: 23,
    bpid: 2,
    mpid: 2,
    name: '权限',
    icon: 'solution',
    router: '/authory',
  },
]
