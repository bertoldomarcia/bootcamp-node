const {body, validationResult} = require('express-validator/check');
const {matchesData} = require('express-validator/filter');

module.exports = (app) => {
    const Tasks = app.db.models.Tasks;

    app.route('/tasks')
    .get((req, res) => {
        Tasks.findAll()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error.message });
        });
    })
    .post([
        body('title', 'Required field').exists(),
        body('title', 'Invalid length').trim().isLength({min:1, max:255})
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({errors: errors.array()});
        }

        Tasks.create(matchedData(req))
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error.message });
        });
    });

   app.route('/tasks/:id')    
    .get((req, res) => {
        Tasks.findById(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error.message });
        });
    })    
    .put((req, res) => {
        Tasks.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(error => {
            res.status(500).json({ msg: error.message });
        });        
    })
    .delete((req, res) => {
        Tasks.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(error => {
            res.status(500).json({ msg: error.message });
        });
    });  

};