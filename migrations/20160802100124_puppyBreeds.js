exports.up = function (knex) {
  return knex.schema.createTable('puppyBreeds', function (table) {
    table.increments('id').primary()
    table.string('breed')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('puppyBreeds')
}
