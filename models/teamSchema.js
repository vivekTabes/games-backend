const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        captainName: {
            type: String
        },
        contact: {
            type: String
        },

        dateOfJoining: {
            type: Date
        },
        email: {
            type: String
        },
        levelOfExperiance: {
            type: String
        },
        location: {
            type: String
        },
        name: {
            type: String
        },
        noOfTeamPlayer: {
            type: String
        },
        teamName:  {
            type: String
        },
        teamID: {
          type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
