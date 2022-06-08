const knex = require('knex')
const config = require('./knexfile').development
const connection = knex(config)

function listAllPuppies(db = connection) {
  return db('puppies')
    .join('puppyImages', 'puppies.image_id', 'puppyImages.id')
    .select(
      'puppies.id',
      'puppies.name',
      'puppies.owner',
      'puppyImages.imagePath'
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

// function listAssignments(db = connection) {
//   return db('wombles')
//     .join('rubbish', 'wombles.rubbish_id', 'rubbish.id')
//     .select('wombles.id', 'wombles.name', 'rubbish.name as rubbishName')
// }

// function getVehiclesByOwnerName(ownerName, db = connection) {
//   return db('vehicles')
//     .join('owners', 'vehicles.owner_id', 'owners.id')
//     .select()
//     .where('owners.name', ownerName)
// }

module.exports = {
  listAllPuppies,
  getPuppy,
}
