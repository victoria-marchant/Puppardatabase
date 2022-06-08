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
