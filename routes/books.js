// Create a new router
const express = require("express")
const router = express.Router()

// redirects to log in page
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('../users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

// Search books route
router.get('/search',redirectLogin,function(req, res, next){
    res.render("search.ejs")
});


// Handle the search form submission
router.get('/search-result', function (req, res, next) {
    //searching in the database
    res.send("You searched for: " + req.query.keyword)
});

// List books route
router.get('/list', redirectLogin, function(req, res, next) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("list.ejs", {availableBooks:result})
         });
});

// Add book route
router.get('/addbook', redirectLogin, function(req, res, next){
res.render('addbook.ejs')
});

// Handle the add book form submission
router.post('/bookadded', function (req, res, next) {
    // saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)"
    
    // execute sql query
    let newrecord = [req.body.title, req.body.price]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(' This book is added to database, name: '+ req.body.title + ' price '+ req.body.price)
    })
}) 

// Export the router object so index.js can access it
module.exports = router
