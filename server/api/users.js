
module.exports = (app, db) => {
  app.get( "/users", (req, res) =>
    db.Users.findAll().then( (result) => res.json(result) )
  );

  app.get( "/users/:id", (req, res) =>
    db.Users.findByPk(req.params.id).then( (result) => res.json(result))
  );

  app.put( "/users/:id", (req, res) =>
    db.Users.update( req.body,
    {
      where: {
        id: req.params.id
      }
    }).then( 
      (result) => res.json(result) 
    ).catch( (msg) => {
      return res.send(msg);
    })
  );

  app.post("/users", (req, res) => 
    db.Users.create( 
      req.body 
    ).then( 
      (result)=> res.json(result)
    ).catch( (msg) => {
      return res.send(msg);
    })
  );

  app.delete( "/users/:id", (req, res) =>
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}