const knex = require('knex')
const config = require('./knexfile').development
const connection = knex(config)

function listPuppyBreeds(db = connection) {
  return db('puppyBreeds').select()
}

function listAllPuppies(db = connection) {
  return db('puppies')
    .join('puppyImages', 'puppies.image_id', 'puppyImages.id')
    .join('puppyBreeds', 'puppies.breed_id', 'puppyBreeds.id')
    .select(
      'puppies.id',
      'puppies.name',
      'puppies.owner',
      'puppyImages.imagePath',
      'puppyBreeds.Breed'
    )
}

function getPuppy(id, db = connection) {
  return db('puppies')
    .join('puppyBreeds', 'puppies.breed_id', 'puppyBreeds.id')
    .join('puppyImages', 'puppies.image_id', 'puppyImages.id')
    .select(
      'puppies.id',
      'puppies.name',
      'puppies.owner',
      'puppyBreeds.breed',
      'puppyImages.imagePath'
    )
    .where('puppies.id', id) // returns an array of objects
    .first() // returns an object
}

function updatePuppy(updatedPuppy, db = connection) {
  return db('puppies')
    .update({
      name: updatedPuppy.name,
      owner: updatedPuppy.owner,
    })
    .where('puppies.id', updatedPuppy.id)
    .then(() => {
      return db('puppies').select().where('puppies.id', updatedPuppy.id).first()
    })
    .then((puppy) => {
      return db('puppyBreeds')
        .update({
          breed: updatedPuppy.breed,
        })
        .where('puppyBreeds.id', puppy.breed_id)
    })
}

function addNewPuppy(newPuppy, db = connection) {
  return db('puppyImages')
    .insert({
      imagePath: newPuppy.imagePath,
    })
    .then(() => {
      return db('puppies').insert({
        name: newPuppy.name,
        owner: newPuppy.owner,
        breed_id: newPuppy.breedId,
      })
    })
}

// return knex("users")
//   .insert({ first_name: "John", last_name: "Doe" })
//   .returning('id')
//   .then(function (response) {
//     return knex('groups')
//       .insert({name: 'Cool Group', user_id: response[0]})
//   });

// function deleteEvent(id, db = connection) {
//   return db('events').delete().where('id', id)
// }

module.exports = {
  listAllPuppies,
  getPuppy,
  updatePuppy,
  addNewPuppy,
  listPuppyBreeds,
}
