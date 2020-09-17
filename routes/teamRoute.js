const express = require('express');
const router = express.Router();

const { creatTeam, getAllTeams }  = require('../controllers/teamController');

router.post('/createTeam', creatTeam);
router.get('/allTeam', getAllTeams);

module.exports = router;
