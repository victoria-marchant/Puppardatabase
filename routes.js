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
      // console.log(puppy)
      res.render('editPuppy', puppy)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

router.post('/puppies/:id/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body
  const updatedPuppy = req.body
  updatedPuppy.id = req.params.id
  console.log(updatedPuppy)
  db.updatePuppy(updatedPuppy)
    .then((updatedPuppy) => {
      console.log(updatedPuppy)
      // res.render('editLocation', location)
      res.redirect(`/puppy/${req.params.id}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// GET /events/add/friday
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
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body
  const newPuppy = req.body
  console.log(newPuppy)
  db.addNewPuppy(newPuppy)
    .then((Puppy) => {
      // console.log(Puppy)
      // res.render('editLocation', location)
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// // POST /events/add
// router.pos('/puppies/newpuppy', (req, res) => {
//   const newEvent = req.body
//   const day = validateDay(req.body.day)
//   db.addNewEvent(newEvent)
//     .then((event) => {
//       console.log(event)
//       res.redirect(`/schedule/${day}`)
//       // const viewData = { locations, days, day }
//       // res.render('addEvent', viewData)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.status(500).send('server error')
//     })
// })

// router.post('/delete', (req, res) => {
//   const id = Number(req.body.id)
//   const day = validateDay(req.body.day)
//   db.deleteEvent(id)
//     .then((result) => {
//       console.log(result)
//       res.redirect(`/schedule/${day}`)
//       // const viewData = { locations, days, day }
//       // res.render('addEvent', viewData)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.status(500).send('server error')
//     })
// })

// // router.get('/assignments', (req, res) => {
// //   db.listAssignments()
// //     .then((wombles) => {
// //       console.log(wombles)
// //       res.render('assignments', { wombles })
// //     })
// //     .catch((err) => {
// //       // console.error(err)
// //       res.status(500).send('Server error')
// //     })
// // })

module.exports = router
