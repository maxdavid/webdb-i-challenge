const accountModel = require('./accountModel');

module.exports = {
  validateAccountId,
  validateAccount
};

function validateAccountId(req, res, next) {
  req.account = { id: req.params.id };
  if (req.account.id) {
    accountModel.get(req.account.id).then(account => {
      if (account.length) {
        [req.account] = account;
        next();
      } else res.status(400).json({ message: 'Invalid Account ID' });
    });
  } else res.status(400).json({ message: 'Account ID required' });
}

function validateAccount(req, res, next) {
  if (req.body && req.body.name && req.body.budget) next();
  else if (!req.body.name)
    res.status(400).json({ message: 'Missing required name field' });
  else if (!req.body.budget)
    res.status(400).json({ message: 'Missing required budget field' });
  else res.status(400).json({ message: 'Missing account data' });
}
