const { body, validationResult } = require('express-validator');
const Profile = require('../../models/Profile')

const createAndUpdateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    // destructuring
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        gitHubUserName,
        youtube,
        facebook
    } = req.body


    // creating profile field 
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (status) profileFields.status = status
    if (skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim())
    }
    if (bio) profileFields.bio = bio
    if (gitHubUserName) profileFields.gitHubUserName = gitHubUserName

    // build social field

    profileFields.social = {}

    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook




    let profile = await Profile.findOne({ user: req.user.id })


    try {

        if (profile) {

            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile)
        }

        profile = new Profile(profileFields)
        await profile.save()
        res.send(profile)



    } catch (error) {
        res.status(500).send("server error")
        console.log(error.message)
    }

}

module.exports = createAndUpdateProfile