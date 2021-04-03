const express = require("express");
const {
  createQuery,
  getAllQueries,
  getQueryById,
  getQuery,
  removeQuery,
} = require("../controllers/query");
const router = express.Router();

router.param("queryId", getQueryById);

router.post("/query/create", createQuery);

router.get("/queries", getAllQueries);
router.get("/query/:queryId", getQuery);

router.delete("/query/:queryId", removeQuery);

module.exports = router;
