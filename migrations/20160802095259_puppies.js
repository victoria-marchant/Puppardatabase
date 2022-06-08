exports.up = function (knex) {
  return knex.schema.createTable('puppies', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('owner')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('puppies')
}
