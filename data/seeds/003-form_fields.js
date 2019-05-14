exports.seed = function(knex) {
  return knex('form_fields').insert([
    {
      form_id: 1,
      name: 'Picture'
    },
    {
      form_id: 1,
      name: 'Name'
    },
    {
      form_id: 2,
      name: 'Headline'
    },
    {
      form_id: 2,
      name: 'Location'
    },
    {
      form_id: 2,
      name: 'Total Endorsements'
    }
  ])
}
