const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = server => {
  router.get('/courses', (req, res, next) => {
    let url_parts = url.parse(req.originalUrl, true),
      query = url_parts.query,
      from = query.start,
      to = +query.start + +query.count,
      sort = query.sort,
      queryStr = query.query,
      courses = server.db.getState().courses;
    console.log(sort);
    console.log(queryStr, from, to);
    if (courses.length < to) {
      to = courses.length;
    }
    courses = courses.filter(course => course.name.indexOf(queryStr) !== -1);
    courses = courses.slice(from, to);

    res.json(courses);
  });

  router.delete('/courses/:id', (req, res, next) => {
    let state = server.db.getState();
    const id = req.params.id;

    state.courses = state.courses.filter(course => course.id != id);
    server.db.setState(state);
    res.json(id);
  });

  router.get('/courses/:id/authors', (req, res, next) => {
    let state = server.db.getState();
    const courseId = req.params.id;

    const course = state.courses.filter(c => c.id == courseId);
    res.json(course[0].authors);
  });

  router.post('/courses', (req, res, next) => {
    let state = server.db.getState();
    const course = req.body;
    state.courses.push(course);
    server.db.setState(state);

    console.log(state.courses)
    res.json(course);
  });

  router.put('/courses/:id', (req, res, next) => {
    let state = server.db.getState();
    const id = req.params.id;
    let course = req.body;

    state.courses = state.courses.filter(course => course.id != id);
    state.courses.push(course);
    server.db.setState(state);

    res.json(course);
  });

  return router;
};
