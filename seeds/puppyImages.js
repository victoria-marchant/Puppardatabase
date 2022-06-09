exports.seed = (knex) =>
  knex('puppyImages')
    .del()
    .then(() =>
      knex('puppyImages').insert([
        { id: 99901, imagePath: '/images/puppy1.jpg' },
        { id: 99902, imagePath: '/images/puppy2.jpg' },
        { id: 99903, imagePath: '/images/puppy3.jpg' },
        { id: 99904, imagePath: '/images/puppy4.jpg' },
        { id: 99905, imagePath: '/images/puppy5.jpg' },
        { id: 99906, imagePath: '/images/puppy6.jpg' },
        { id: 99907, imagePath: '/images/puppy7.jpg' },
        { id: 99908, imagePath: '/images/puppy8.jpg' },
      ])
    )
