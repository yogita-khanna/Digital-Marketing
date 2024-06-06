const express = require('express');
const router = express.Router();
const  Contact = require('../models/ContactDetails');
const isLoggedIn = require('../middleware/isLoggedIn');

const requireAuth = (req, res, next) =>{
  const token1 = req.cookies.jwt;
  var token2 = false;
  if(!req.cookies.username){
    res.send('No student is Authorised')
  }
  User.find({username : req.cookies.username}).then(val =>{
    if(val[0].role === 'admin'){
      token2 = true;
      if(token1 && token2){
        jwt.verify(token1,'kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls', (err, decodedToken) =>{
          if(err){
            console.log('huhiuiuhihiuhihu');
            console.log(err.message);
          }else{
            next();
          }
        });
          }
          else{
            res.send('404 error no student in authorised');
          }
    }

    });

};
router.post('/contact', requireAuth, async (req, res) => {
    try {
        const { name, email, message, phoneNo, serviceName } = req.body;
        const userId = req.session.user ? req.session.user._id : null;

        // Check if the email already exists
        const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(400).json({
                message: "Email already exists.",
                success: false,
            });
        }

        // Create a new contact with user's ID
        const newContact = new Contact({
            user: userId, // Assign user's ID to the contact
            name,
            email,
            message,
            phoneNo,
            serviceName
        });

        // Save the contact to the database
        await newContact.save();

        return res.status(201).json({
            message: "Contact details saved successfully.",
            success: true,
            contact: newContact,
        });
    } catch (error) {
        console.error("Error saving contact details:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});



module.exports = router;
