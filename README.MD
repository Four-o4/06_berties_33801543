# Berties Books

Uses node.js with Express and EJS, bcrypt and mysql

To install and run:

npm install
node index.js

Access control added to registered users, add book, search books and book list

Sanitization added in the first name, last name, username and password:
- first and last name is REQUIRED
- Username must be between 5 - 20 characters long
- password must have a minimum of 8 characters

# STRUCTURE:

# Berties bookshop

## Welcome to berties bookshop!
- About berties book shop
- search for books
- register with us
- add book
- Login to your account
- See our book list
--
-------------------------------------------------------------------------

# About berties book shop
- We sell all sorts of books and nothing else!
--
-------------------------------------------------------------------------

# Register with us
- FIRST NAME:
- LAST NAME:
- EMAIL:
- USERNAME:
- PASSWORD:
--
--------------------------------------------------------------------------

# Sign in
- Username:
- password:
--
-------------------------------------------------------------------------

# Registered users
- A list of all users registered will show up
--
-------------------------------------------------------------------------

# Add book
- TITLE:
- PRICE:
--
-------------------------------------------------------------------------

# See our book list
- List of all registered books within the database will show up
--
-------------------------------------------------------------------------

# Check weacher
- Users are able to search the current weather in any valid location

*given wrong location will result in an error message*
-------------------------------------------------------------------------

# Logout
- User will be logged out of their account
--
-------------------------------------------------------------------------

# CHECK BOOKS IN JSON FORMAT

