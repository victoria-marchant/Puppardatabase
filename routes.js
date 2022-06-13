const express = require('express')
const db = require('./db')

const router = express.Router()

router.get('/', (req, res) => {
  db.listAllPuppies()
    .then((puppies) => {
      // console.log(puppies[0])
      res.render('home', { puppies })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

router.get('/puppy/:id', (req, res) => {
  db.getPuppy(req.params.id)
    .then((puppy) => {
      // console.log(puppy)
      res.render('puppy', puppy)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

router.get('/puppies/:id/edit', (req, res) => {
  db.getPuppy(req.params.id)
    .then((puppy) => {
      // console.log(puppy)
      res.render('editPuppy', puppy)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

router.post('/puppies/:id/edit', (req, res) => {
  const updatedPuppy = req.body
  updatedPuppy.id = req.params.id
  // console.log(updatedPuppy)
  db.updatePuppy(updatedPuppy)
    .then((updatedPuppy) => {
      // console.log(updatedPuppy)
      // res.render('editLocation', location)
      res.redirect(`/puppy/${req.params.id}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

router.get('/puppies/newpuppy', (req, res) => {
  db.listPuppyBreeds()
    .then((breed) => {
      // console.log(breed)
      res.render('newPuppy', { breed })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('server error')
    })
})

router.post('/puppies/newpuppy', (req, res) => {
  const newPuppy = req.body
  // console.log(newPuppy)
  db.addNewPuppy(newPuppy)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

router.post('/puppies/delete', (req, res) => {
  const id = req.body.id
  db.deletePuppy(id)
    .then((result) => {
      // console.log(result)
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('server error')
    })
})

module.exports = router
