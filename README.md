# Instagram Tours

## Description
Instagram tours is an app to book tours in Barcelona. The front-end is built with React and Semantic UI React, while the back-end will use express.js and node.js.

## User Stories

-  **404:** As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
-  **500:** As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
-  **Homepage:** As a user I want to understand the product in the landing page and be able to start the booking process. Logged user has access to profile and booked tours. New user can log in.
-  **Signup:** As a user I want to be able to sign up.
-  **Login:** As a new user I want to be able to log in.
-  **Logout:** As a user I can logout from the application so no one else can use it
-  **See Profile** As a user I will be able to see profile.
-  **Edit Profile** As a user I will be able to edit profile.
-  **Book Tour** As a user I will be able select a day for a tour and book places. 
-  **Booked Tours** As a user I will be able to see the tours I have booked in the past. 

## Backlog

Buying experience:
- Customize Tour (pick your route)
- Customize Tour (add extras)
- Formik
- Confirmation Email

APIs:
- Stripe API
- Google Maps (with pictures for each location and routes)
- Authentication with Facebook
- Weather forecasts

Profile:
- See who is going with you on the tour

Admin:
- Dashboard for admin
- Check tours
- Edit Places
- Contact customers


## Routes Front-End
| Path | Component | Permissions | Behavior | 
|------|--------|--| -------|
| `/` | HomePage | public | <li>Explain Tours <li>Call to Action |
| `/book` | Booking | public | <li>Select Date <li> Select number of persons <li>Continue |
| `/book/confirm` | ShoppingCart | public | <li>Display selected date, number of persons, and price <li> Confirm |
| `/auth/login` | FormUser | public (private to logged users)  | <li>Display  inputs for username and password <li>Log in button <li>Link to Sign Up |
| `/auth/signup` | FormUser | public (private to logged users)  | <li>Display  inputs for username, password, name, contact <li>Create button <li> Created user will be logged in |
| `/profile` | FormUser | private | <li>Edit your profile|
| `/profile/bookedtours` | BookedTours | private | <li> List booked tours|




## Components

- Navbar Component
- Homepage Component
- Booking Component
  - Calendar Component
    - Output: Date
  - Output: Date,{ buyer, numOfTickets } , Array Places
- ShoppingCart Component
  - Input: Date,{ buyer, numOfTickets } , Array Places
- FormUser Component
- OrderHistory Component

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Tour Service
  - tour.getAllTours()
  - tour.makeBooking({date, user, places})
  - tour.getBookedToursByUser(userId)  

# Server

## Routes Back-End
| Method | Path | Behavior | Body |
|--------|------| ---------|------|
| `get`  | `/auth/me` | <li>404 if no user in session <li> 200 with user object | |
| `post`  | `/auth/signup` | <li> Validation: user already logged in (401) <li> Validation: empty fields (422) <li> Validation: user already taken (409) <li> Create user with encrypted password <li> store user in session <li> Return 201 with user object |  <li> username <li> password <li> name <li> phoneNumber |
| `post`  | `/auth/login` | <li> Validation: user already logged in (401) <li> Validation: empty fields (422) <li> Validation: user doesn't exist (404) <li> Validation: password matches (404) <li> store user in session <li> Return 200 with user object | <li> username <li> password|
| `post`  | `/auth/logout` | <li> Destroy session <li> Return 204 | |
| `get`  | `/api/tours` | <li> Return 200 with array of tours | |
| `post`  | `/api/book` | <li> Validation: Exists tour for date <li> Validation: Free spots <li> Return 401 and found tour if tour full <li> Create or update tour <li> Return 200 with tour | <li> date: Date <li>user: Object with buyer and numberOfTickets <li>places: Array Places |
| `get`  | `/api/:id/bookedtours` | <li> Validation: User id exists <li> 404 when user doesn't exist  <li> 200 with array of tours booked <li> 204 with no tours found|
| `get`  | `/api/places` | <li> Return 200 with array of places ||

## Models

### User model

```
user = {
  username - String // required & unique
  password - String // required
  name - String // required
  phoneNumber - String // required
}
```

### Tour model
```
tour = {
  date - Date // required
  users - [ {
    buyer:ObjectID<User>,
    numberOfTickets: number
   },
  ... ] // required
  places - [ ObjectID<Place>, ... ]
  price - Number
}
```

### Place model
```
place = {
  name - String // required
  coordinates - GeoJSON
  imgUrl - [ String, ...]
}
```

# Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
