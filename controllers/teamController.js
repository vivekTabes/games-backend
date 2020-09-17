const Team  = require('../models/teamSchema');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');

exports.creatTeam = async (req, res) => {
  const { captainName,
          contact,
          dateOfJoining,
          email,
          levelOfExperiance,
          location,
          name,
          noOfTeamPlayer,
          teamName
  }  = req.body;

  const numberofteam = await Team.find()
  const newTeam = Team({
            captainName,
            contact,
            dateOfJoining,
            email,
            levelOfExperiance,
            location,
            name,
            noOfTeamPlayer,
            teamName,
            teamID: "BIB-" + numberofteam.length
  })
  newTeam.save((err, result) => {
    if(err){
      return res.status(400).json({
        result
      })
    }
     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
     sgMail.send({
          to: email,
          from: "vivek.11jan1993@gmail.com",
          subject: `${teamName} - Football tournament`,
          html: `<div>
                   <h1>Football tournament</h1>
                   <table border = "1">
                           <tr>
                              <td>Captain name</td>
                              <td>${result.captainName}</td>
                           </tr>
                           <tr>
                              <td>Contact</td>
                              <td>${result.contact}</td>
                           </tr>

                           <tr>
                              <td>Date of joining</td>
                              <td>${moment(result.dateOfJoining).format('LLLL')}</td>
                           </tr>
                           <tr>
                              <td>Email</td>
                              <td>${result.email}</td>
                           </tr>

                           <tr>
                              <td>Level of experiance</td>
                              <td>${result.levelOfExperiance}</td>
                           </tr>
                           <tr>
                              <td>Location</td>
                              <td>${result.location}</td>
                           </tr>

                            <tr>
                              <td>Name</td>
                              <td>${result.name}</td>
                           </tr>
                           <tr>
                              <td>No. of team player</td>
                              <td>${result.noOfTeamPlayer}</td>
                           </tr>

                            <tr>
                              <td>Team name</td>
                              <td>${result.teamName}</td>
                           </tr>
                           <tr>
                              <td>Team ID</td>
                              <td>${result.teamID}</td>
                           </tr>
                        </table>
                </div>`
        })

    res.status(200).json({
    message: "Team created successfuly"
    })
  })
}

exports.getAllTeams = (req, res) => {
   Team.find()
    .select('captainName contact dateOfJoining email levelOfExperiance location name noOfTeamPlayer teamName teamID')
    .sort({ createdAt: -1 })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        result
      })
    })
}
