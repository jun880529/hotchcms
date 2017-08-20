const _ = require('lodash');
const { arrayToTree } = require('../utils');
const Category = require('../models/category.model');

const categorySchema = 'name path state sort keywords description';

exports.tree = async ctx => {
  try {
    const list = await Category._list();

    const tree = arrayToTree(list.filter(i => i.state), '_id', 'uid')

    ctx.pipeDone(tree);
  } catch(e) {
    ctx.pipeFail(e);
  }
};

/**
 * 创建分类
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.create = async ctx => {
  ctx.checkBody({
    'uid': {
      optional: true,
      isMongoId: { errIorMessage: 'uid 需为 mongoId' },
    },
    'index': {
      optional: true,
      isBoolean: { errorMessage: 'index 需为 Boolean' }
    },
    'name': {
      notEmpty: {
        options: [true],
        errorMessage: 'name 不能为空'
      },
      isString: { errorMessage: 'name 需为 String' },
    },
    'path': {
      notEmpty: {
        options: [true],
        errorMessage: 'path 不能为空'
      },
      isString: { errorMessage: 'path 需为 String' },
    },
    'state': {
      optional: true,
      isBoolean: { errorMessage: 'state 需为 Boolean' }
    },
    'sort': {
      optional: true,
      isNumber: { errorMessage: 'sort 为 Number' }
    },
    'template': {
      optional: true,
      isMongoId: { errIorMessage: 'template 需为 mongoId' },
    },
    'keywords': {
      optional: true,
      isString: { errorMessage: 'keywords 需为 String' },
    },
    'description': {
      optional: true,
      isString: { errorMessage: 'description 需为 String' },
    }
  });

  if (ctx.validationErrors()) return null;

  try {
    await Category.create(ctx.request.body);
    ctx.pipeDone();
  } catch(e) {
    ctx.pipeFail(e);
  }
};

/**
 * 更新分类
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.update = async ctx => {
  ctx.checkBody({
    'uid': {
      optional: true,
      isMongoId: { errIorMessage: 'uid 需为 mongoId' },
    },
    'name': {
      optional: true,
      isString: { errorMessage: 'name 需为 String' },
    },
    'state': {
      optional: true,
      isBoolean: { errorMessage: 'state 需为 Boolean' }
    },
    'sort': {
      optional: true,
      isNumber: { errorMessage: 'sort 为 Number' }
    },
    'keywords': {
      optional: true,
      isString: { errorMessage: 'keywords 需为 String' },
    },
    'description': {
      optional: true,
      isString: { errorMessage: 'description 需为 String' },
    }
  });

  ctx.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: { errorMessage: '_id  需为 mongoId' }
    }
  });

  if (ctx.validationErrors()) return null;

  try {
    await ContentCategory.update({ _id: ctx.params._id }, ctx.request.body);
    ctx.pipeDone();
  } catch(e) {
    ctx.pipeFail(e);
  }
};

/**
 * 查询单个分类
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.one = async ctx => {
  ctx.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: { errorMessage: '_id  需为 mongoId' }
    }
  });

  if (ctx.validationErrors()) return null;

  try {
    const call = await ContentCategory.findById(ctx.params._id)
      .select('uid name path state sort keywords description')
      .lean();
    call ? ctx.pipeDone(call) : ctx.pipeFail('查询失败', 'BN99');
  } catch(e) {
    ctx.pipeFail(e);
  }
};

/**
 * 查询分类列表
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.list = async ctx => {
  try {
    const call = await Category._list();
    ctx.pipeDone(call);
  } catch(e) {
    ctx.pipeFail(e);
  }
};

/**
 * 删除分类
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.delete = async ctx => {
  ctx.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: { errorMessage: '_id  需为 mongoId' }
    }
  });

  if (ctx.validationErrors()) return null;

  try {
    await ContentCategory.remove({ _id: ctx.params._id });
    await ContentCategory.update({ uid: ctx.params._id }, { $unset: { uid: true } });
    ctx.pipeDone();
  } catch(e) {
    ctx.pipeFail(e);
  }
};