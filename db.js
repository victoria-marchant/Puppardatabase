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
  console.log(newPuppy)
  return db('puppyImages')
    .insert({
      imagePath: newPuppy.imagePath,
    })
    .then((newPuppyImagesId) => {
      console.log(newPuppyImagesId)
      return db('puppies').insert({
        name: newPuppy.name,
        owner: newPuppy.owner,
        breed_id: Number(newPuppy.breedId),
        image_id: newPuppyImagesId[0],
      })
    })
}

// function deletePuppy(id, db = connection) {
//   return db('puppies')
//     .join('puppyBreeds', 'puppies.breed_id', 'puppyBreeds.id')
//     .join('puppyImages', 'puppies.image_id', 'puppyImages.id')
//     .delete(
//       'puppies.id',
//       'puppies.name',
//       'puppies.owner',
//       'puppies.breed_id',
//       'puppyImages.imagePath',
//       'puppyImages.id',
//       'puppies.image_id'
//     )
//     .where('puppies.id', id)
//     .first()
// }

// We have the puppies table puppy id
// We need to get the image_id using this puppy id
// We can then also delete puppy image row from the puppyImages table.
// We can then delete the puppy from the puppy table using this puppy id

function deletePuppy(id, db = connection) {
  return db('puppies')
    .select()
    .where('puppies.id', id)
    .first()
    .then((puppy) => {
      console.log(puppy)
      console.log(puppy.image_id)
      return db('puppyImages').where('puppyImages.id', puppy.image_id).del()
    })
    .then(() => {
      return db('puppies').where('puppies.id', id).del()
    })
  // return db('puppyImages')
  //   .delete()
  //   .where('puppiesImages.id', id)
  //   .first()
  //   .then((puppy) => {
  //     return db('puppyImages').delete().where('puppyImages.id', puppy.image_id)
  //   })
  //   .then(() => {
  //     return db('puppies').select().where('puppies.id', id).first().delete()
  //   })
}

module.exports = {
  listAllPuppies,
  getPuppy,
  updatePuppy,
  addNewPuppy,
  listPuppyBreeds,
  deletePuppy,
}
