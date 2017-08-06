module.exports = {
  '/api': {
    '/install': {
      get: 'install.status',
      post: 'install.install',

      '/test-database': {
        put: 'install.testDatabase'
      }
    },

    '/admin-account': {
      // all: 'admin-account.check', // 检查登录
      get: 'admin-account.current', // 查询账号
      put: 'admin-account.update', // 更新账号

      '/sign-in': {
        put: 'admin-account.signIn' // 登录
      },

      '/sign-out': {
        put: 'admin-account.signOut' // 退出
      }
    },

    'admin-group': {
      post: ['admin-group.create'], // 新增用户组
      put: ['admin-group.update'], // 更新用户组
      get: ['admin-group.list'], // 查询所有用户组

      '/:_id': {
        get: ['admin-group.one'], // 查询用户组
        delete: ['admin-group.delete'] // 删除用户组
      }
    },

    'admin-user': {
      post: ['admin-user.create'], // 新增账号
      put: ['admin-user.update'], // 更新账号
      get: ['admin-user.list'], // 查询所有账号

      '/:_id': {
        get: ['admin-user.one'], // 查询账号
        delete: ['admin-user.delete'] // 删除账号
      }
    },

    'content-category': {
      post: ['admin-user.create'], // 新增分类
      put: ['admin-user.update'], // 更新分类
      get: ['admin-user.list'], // 查询所有分类

      '/:_id': {
        get: ['admin-user.one'], // 查询分类
        delete: ['admin-user.delete'] // 删除分类
      }
    },

    '/*': {
      all: 'admin-account.check'
    },

    '/authorities': {
      get: ['authority.list'] // 权限列表
    },
  },
};