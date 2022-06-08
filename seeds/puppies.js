exports.seed = (knex) =>
  knex('puppies')
    .del()
    .then(() =>
      knex('puppies').insert([
        {
          id: 88801,
          name: 'Stevie',
          owner: 'Sarah and Rob',
          breed_id: '77701',
          image_id: '99901',
        },
        {
          id: 88802,
          name: 'Coco',
          owner: 'Chloe',
          breed_id: '77705',
          image_id: '99902',
        },
        {
          id: 88803,
          name: 'Magnum',
          owner: 'Michael',
          breed_id: '77703',
          image_id: '99903',
        },
        {
          id: 88804,
          name: 'Saddie',
          owner: 'Sam',
          breed_id: '77705',
          image_id: '99904',
        },
        {
          id: 88805,
          name: 'Murphy',
          owner: 'Matthew',
          breed_id: '77704',
          image_id: '99905',
        },
        {
          id: 88806,
          name: 'Bella',
          owner: 'Brianna',
          breed_id: '77703',
          image_id: '99906',
        },
        {
          id: 88807,
          name: 'Rocky',
          owner: 'Ricky',
          breed_id: '77703',
          image_id: '99907',
        },
        {
          id: 88808,
          name: 'Fido',
          owner: 'Bob',
          breed_id: '77705',
          image_id: '99908',
        },
      ])
    )
