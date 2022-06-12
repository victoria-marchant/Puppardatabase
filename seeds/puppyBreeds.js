exports.seed = (knex) =>
  knex('puppyBreeds')
    .del()
    .then(() =>
      knex('puppyBreeds').insert([
        { id: 77701, Breed: 'Golden Labrador' },
        { id: 77702, Breed: 'Labrador' },
        { id: 77703, Breed: 'Rottweiler' },
        { id: 77704, Breed: 'Pug' },
        { id: 77705, Breed: 'Mix' },
        { id: 77705, Breed: 'Other' },
      ])
    )
