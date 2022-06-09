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
      console.log(puppy)
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
      console.log(puppy)
      res.render('editPuppy', puppy)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// router.get('/:id/edit', (req, res) => {
//   const id = Number(req.params.id)
//   db.getLocationById(id)
//     .then((location) => {
// console.log(location)
//   res.render('editLocation', location)
// })
// .catch((err) => {
//   console.error(err)
//   res.status(500).send('Server error')
// })

// POST/puppies/:id/edit
// router.post('/:id/edit', (req, res) => {
//   const editedPuppy = req.body
//   const id = req.params.id
//   changePuppy(id, editedPuppy, () => {
//     res.redirect('/puppies/' + id)
//   })
// })

router.post('/puppies/:id/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body
  const updatedPuppy = req.body
  console.log(updatedPuppy)
  db.updatePuppy(updatedPuppy)
    .then((updatedPuppy) => {
      console.log(updatedPuppy)
      // res.render('editLocation', location)
      res.redirect('/puppy/:id')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// router.get('/assignments', (req, res) => {
//   db.listAssignments()
//     .then((wombles) => {
//       console.log(wombles)
//       res.render('assignments', { wombles })
//     })
//     .catch((err) => {
//       // console.error(err)
//       res.status(500).send('Server error')
//     })
// })

module.exports = router
