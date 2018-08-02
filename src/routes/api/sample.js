const Sample = require('../../schemas/Sample');

module.exports = (app) => {
  app.get('/api/sample/get', (req, res, next) => {
    Sample.find()
      .exec()
      .then((team) => res.json(team))
      .catch((err) => next(err));
  });


  app.post('/api/teams/create', function (req, res, next) {
    const sample = new Sample({
      name : req.body.name,
    });
    sample.save()
      .then(() => res.json(sample))
      .catch((err) => next(err));
  });

  app.delete('/api/sample/:id', function (req, res, next) {
    Sample.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((sample) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/sample/update/:id',function (req, res, next)  {
    let id = req.params.id;
    Sample.findById({"_id":id})
      .exec()
      .then((sample) => {
        sample.name = req.body.params.name;
        sample.save()
          .then(() => res.json(sample))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

};
