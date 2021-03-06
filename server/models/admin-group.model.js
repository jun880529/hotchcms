const mongoose = require('mongoose');

/**
 * 管理员用户组
 */
const AdminGroupSchema = new mongoose.Schema({
  // 名称
  name: { type: String, required: true, unique: true },

  // 备注
  description: String,

  // 管理等级
  gradation: { type: Number, mix: 0, max: 100, default: 0 },

  // 权限列表
  authorities: { type: Array, default: [] },
}, {
  collection: 'adminGroup',
  id: false
});

const select = 'name description root authorities';

AdminGroupSchema.statics = {

  _one(_id) {
    return this.findById(_id).select(select);
  },

  async _list({ page = 1, size = 20, ...query }) {
    if (query.name) query.name = new RegExp(query.name, 'i');
    const count = await this.count(query);
    const list = await this.find(query).skip((page - 1) * size).limit(size).select(select).lean();
    return { count, page, size, list };
  },

  _count() {
    return this.count({});
  }
};

module.exports = mongoose.model('AdminGroup', AdminGroupSchema);