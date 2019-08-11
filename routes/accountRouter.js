const express = require('express');
const router = express.Router();
const accountModel = require('../data/helpers/accountModel');
const middleware = require('../data/helpers/middleware');

const { validateAccount, validateAccountId } = middleware;

router.get('/', (req, res) => {
  accountModel.get().then(accounts => res.status(200).json(accounts));
});

router.get('/:id', validateAccountId, (req, res) => {
  res.status(200).json(req.account);
});

router.post('/', validateAccount, (req, res) => {
  accountModel.insert(req.body).then(newAccount => {
    if (newAccount)
      res.status(201).json({ message: 'Account added.', account: newAccount });
    else res.status(500).json({ message: 'Error adding account.' });
  });
});

router.delete('/:id', validateAccountId, (req, res) => {
  accountModel.remove(req.account.id).then(records => {
    if (records) res.status(200).json({ message: 'Account deleted.' });
    else res.status(500).json({ message: 'Error deleting account.' });
  });
});

router.put('/:id', validateAccountId, validateAccount, (req, res) => {
  accountModel.update(req.account.id, req.body).then(account => {
    if (account)
      res.status(200).json({ message: 'Account updated.', account: account });
    else res.status(500).json({ message: 'Error updating account.' });
  });
});

module.exports = router;
