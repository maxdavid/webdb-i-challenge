const db = require('../dbConfig');

module.exports = {
  get: function(id) {
    if (id) return db('accounts').where('id', id);
    else return db('accounts');
  },
  insert: function(account) {
    return db('accounts')
      .insert(account)
      .then(([id]) => this.get(id));
  },
  update: function(id, account) {
    return db('accounts')
      .where('id', id)
      .update(account)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db('accounts')
      .where('id', id)
      .del();
  }
};
