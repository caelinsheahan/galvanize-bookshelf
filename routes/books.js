'use strict'

const express = require('express')
const knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router()

// YOUR CODE HERE
router.get('/books', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
    .then(books => {
      res.status(200).send(books)
    })
})

router.get('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .first()
    .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
    .then(book => {
      res.status(200).send(book)
    })
})
router.post('/books', (req, res, next) => {
  knex('books')
    .insert(
      {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        cover_url: req.body.coverUrl
      },
      '*'
    )
    .then(book => {
      const data = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      }
      res.send(data)
    })
    .done()
})
router.patch('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .update(
      {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        cover_url: req.body.coverUrl
      },
      '*'
    )
    .then(book => {
      const data = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      }
      res.send(data)
    })
    .done()
})
router.delete('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .then(book => {
      const data = {
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      }
      res.send(data)
    })
    .then(() => {
      knex('books')
        .where('id', req.params.id)
        .del()
    })
})

router.use((err, req, res, next) => {
  // default 500 error
  const status = err.status || 500
  res.status(status).json({ error: err })
})

router.use((req, res, next) => {
  // default 404 for not found
  res.status(404).json({ error: { message: 'Not found' } })
})

module.exports = router
