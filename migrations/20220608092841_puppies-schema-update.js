/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('puppies', function (table) {
    table.integer('breed_id')
    table.integer('image_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('puppies', function (table) {
    table.dropColumn('breed_id')
    table.dropColumn('image_id')
  })
}
