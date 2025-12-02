// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const { check, validationResult } = require('express-validator');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

router.get('/register', function (req, res, next) {
    res.render('register.ejs', {errors: [], oldInput: {}})
});

router.get("/list", redirectLogin, function(req, res, next) {
    let sqlquery = "SELECT * FROM users"; // query database to get all the users

    //execute sqlquery
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("users.ejs", {availableUsers:result})
    });
});


router.post('/registered', [check('email').isEmail(),
    check('username').isLength({ min: 5, max: 20}).withMessage('Username must be between 5 and 20 characters long'),
    check('password').isLength({ min: 8}).withMessage('Password must be at least 8 characters long'),
    check('first').not().isEmpty().withMessage('First name is required'),
    check('last').not().isEmpty().withMessage('Last name is required')],
    function (req, res, next) {
    const saltRounds = 10
    const plainPassword = req.body.password
    const errors = validationResult(req)
    const first = req.sanitize(req.body.first)
    const last = req.sanitize(req.body.last)
    const email = req.sanitize(req.body.email)
    if (!errors.isEmpty()) {
        // console.log("hello");
        res.render('./register.ejs', { errors: errors.mapped(), oldInput: req.body });
    }

    else{ bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        // Store hashed password in your database.
        let sqlquery = "INSERT INTO users (first_name, last_name, email, username, password) VALUES (?,?,?,?,?)"
        
        // execute sql query
        let newrecord = [first, last, email, req.body.username, hashedPassword]
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                next(err)
            }
            else {
                result ='Hello '+ req.body.first + ' ' + req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email + 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword
                res.send(result)
            }
        });
    });

    };

});

router.get('/login', function (req, res, next) {
    res.render('signin.ejs')
});

router.post('/loggedin', function (req, res, next) {
    const username = req.body.username
    const plainPassword = req.body.password

    // query database to get the hashed password for the given username
    let sqlquery = "SELECT password FROM users WHERE username = ?"
    
    db.query(sqlquery, [username], (err, result) => {
        if (err) {
            next(err)
        }

        if (!result[0]) {
            res.send('Username not found')
        }

        let hashedPassword = result[0].password;
        bcrypt.compare(plainPassword, hashedPassword, function(err, result) {
            if (err) {
              next(err)
            }
            else if (result == true) {
              req.session.userId = req.body.username;
              res.send('Welcome ' + req.body.username + '!' + 'You are now signed in!' + ' <a href="../">Go to Home Page</a>')           
            }
            else {
              res.send('Incorrect Password')
            }
        });
    });
});
            
   











// Export the router object so index.js can access it
module.exports = router
