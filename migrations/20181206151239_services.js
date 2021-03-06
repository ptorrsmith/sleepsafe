
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('services', table => {
    table.increments('id')
    table.string('name')
    table.integer('qty_default')
    table.integer('qty_remaining')
    table.string("unit")
    table.string('status')
    table.integer('provider_id')
    table.integer('service_type_id')
    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())


  })

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('services')

};
