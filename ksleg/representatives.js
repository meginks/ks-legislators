const router = require('express').Router(); 

const knex = require('knex'); 

const knexConfig = {
    client: 'sqlite',
    useNullAsDefault: true,
    connection: {
        filename: './data/ksleg.db3'
    }
} 

const db = knex(knexConfig); 

// GET reps 

router.get('/', (req, res) => {
    db('representatives')
    .then(reps => {
        res.status(200)
        .json(reps)
    })
    .catch(error => {
        res.status(500)
        .json(error)
    })
}) 


// GET reps by House District 

router.get('/:hd', (req, res) => {
    db('representatives')
    .where({house_district: req.params.hd})
    .then(rep => {
        res.status(200)
        .json(rep)
    })
    .catch(error => 
        res.status(500)
        .json(error))
})

// POST reps 

router.post('/', (req, res) => {
    db('representatives') 
    .insert(req.body)
    .then(ids => {
        const [id] = ids
        db('representatives')
        .where({id})
        .first()
        .then(rep => {
            res.status(200)
            .json(rep)
        })
    }) 
    .catch(error => {
        res.status(500)
        .json(error)
    })
}) 

// PUT reps 

router.put('/:id', (req, res) => {
    db('representatives')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
        if (count>0) {
            db('representatives')
            .where({id: req.params.id})
            .first()
            .then(rep => {
                res.status(200)
                .json(rep)
            })
        } else {
            res.status(404)
            .json({error: 'Could not find rep to update their info'})
        }
    }) 
    .catch(error => {
        res.status(500)
        .json(error)
    })
}) 



module.exports = router;