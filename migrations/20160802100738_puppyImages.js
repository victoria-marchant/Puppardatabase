exports.up = function (knex) {
  return knex.schema.createTable('puppyImages', function (table) {
    table.increments('id').primary()
    table.string('imagePath')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('puppyImages')
}
