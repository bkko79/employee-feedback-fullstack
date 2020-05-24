module.exports = (app, db) => {
  app.get( "/reviews", (req, res) =>
    db.Reviews.findAll().then( (result) => res.json(result) )
  );

  app.get( "/reviews/reviewer/:id", (req, res) =>
    db.Reviews.findAll({
      where: {
        reviewer_id: req.params.id
      },
      include: {
        model: db.Users,
        as: 'reviewee'
      }
    }).then(
      (result) => res.json(result)
    ).catch( (msg) => {
      return res.status(422).send(msg);
    })
  );

  app.get( "/reviews/reviewee/:id", (req, res) =>
    db.Reviews.findAll({
      where: {
        reviewee_id: req.params.id
      },
      include: {
        model: db.Users,
        as: 'reviewer'
      }
    }).then(
      (result) => res.json(result)
    ).catch( (msg) => {
      return res.status(422).send(msg);
    })
  );

  app.put( "/reviews/:id", (req, res) =>
    db.Reviews.update( req.body,
    {
      where: {
        id: req.params.id
      }
    }).then( 
      (result) => res.json(result) 
    ).catch( (msg) => {
      return res.status(422).send(msg);
    })
  );

  app.post("/reviews", (req, res) => 
    db.Reviews.create( 
      req.body 
    ).then( 
      (result)=> res.json(result)
    ).catch( (msg) => {
      return res.status(422).send(msg);
    })
  );

  app.delete( "/reviews/:id", (req, res) =>
    db.Reviews.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}