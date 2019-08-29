const express = require("express");
const router = express.Router();

const opportunitySkills = require("../services/database/opportunitySkills");

/**
 * The route here will be: /addSkillsToOpportunity/ (remember the prefix users is defined in api/index.js)
 */

router.post("/addSkillsToOpportunity", (req, res) => {
  const skills = req.body.skills;
  const opportunityId = req.body.opportunityId;
  opportunitySkills
    .newOpportunitySkills(skills, opportunityId)
    .then((data) => {
      res.send({ success: true });
    })
    .catch((err) => {
      res.sendStatus(500).send({ success: false });
    });
});

router.get("/opportunitySkillsForList", (req, res) => {
  opportunitySkills
    .getSkillsForOpportunitiesList()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.SendStatus(500);
    });
});

module.exports = router;
