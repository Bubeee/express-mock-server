const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = server => {
  router.get('/authors', (req, res, next) => {
    authors = server.db.getState().authors;
    res.json(authors);
  });

  router.get('/authors/:id', (req, res, next) => {
    let state = server.db.getState();
    const authorId = req.params.id;

    const author = state.authors.filter(c => c.id == authorId);
    res.json(author[0].authors);
  });

  return router;
};
