const Query = require("../models/query");

exports.getAllQueries = (req, res) => {
  Query.find().exec((err, queries) => {
    if (err) {
      return res.status(400).json({
        error: "No Queries found",
      });
    }

    return res.json(queries);
  });
};

exports.getQueryById = (req, res, next, id) => {
  Query.findById(id).exec((err, query) => {
    if (err) {
      return res.status(400).json({
        error: "Query not found",
      });
    }
    req.query = query;
    next();
  });
};

exports.getQuery = (req, res) => {
  return res.json(req.query);
};

exports.createQuery = (req, res) => {
  const query = new Query(req.body);
  query.save((err, query) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save query",
      });
    }
    return res.json({ query });
  });
};

exports.removeQuery = (req, res) => {
  const query = req.query;
  query.remove((err, deletedQuery) => {
    if (err) {
      return res.status(400).json({
        error: "Error in deleting the query",
      });
    }
    return res.json({
      message: `Successfully deleted ${deletedQuery.name}`,
    });
  });
};
