# ShopList-Live

ShopList-Live is a real time shopping list application. It allows you to create an account and share lists in real time with friends and family.

## Usage:

### Getting started

Click to go to the register form. Here you can input an email address and password (this will be how you are identified for authentication), and a display name of your choice. Anything You'd like!

After registering, login and you be taken to the main list page. This is where all the lists you are currently a member of will show up, in real time.

But first: add some connections! The top right corner will have a button with your display name. This is where you can add new connections or logout. All you need to connect is the email address of another registered user!

### Making lists

Now that you have a friend (or even if you don't), click the Add List button. Simply enter a name for your list and add any connections from the drop to list to automatically share the list with them.

Slight caveat: There is no friend request implementation currently available. You can add anyone and they can add you, but you won't see who has added you unless you add them back manually.

### Your first list

By now, you should see your shiney new list. The edit button allows you to change the list's name and who the members are, if you happened to have changed your mind. Clicking elsewhere on the list will take you to it.

Here, you can start adding items. The enter key or the plus sign next to the back arrow button at the bottom both work. The shopping cart and credit card/checkout button are not currently implemented. Eventually they will select all items and checkout/delete purchased items, respectively.

Every item you add has a shopping cart icon next to. An empty cart means its still on the shelves, and filled cart means somebody's got it in hand--or plans to! So you don't have to worry about that. These changes will, of course, update in real time for you and the other members. Additions and deletions as well.

That's the preliminary, first round MVP situation. Future plans include per-list chatrooms and list tracking with notifications, but I didn't have the time to get to those just yet.

## Behind the scenes

ShopList-Live is a MERN stack application.

### Frontend

React is the backbone of the frontend, along with the Material-UI library. Material-UI offers a host of great features and makes a great basis. Eventually, MUI's theming tools will be used for customized color schemes, such as a light and dark mode. In the meantime, it makes it very easy to create visually appealing components. I learn something new about it every day.

Beyond that, I am also using axios for API requests and socket.io for all of the real time components. While basic API calls related to the user (register, login, etc) are done traditionally, all of the list based interactions are provided real time via siocket.io. My previous experience with socket.io was a chat application that amounted to probably 30 lines of code (which is cool!), so many of my pain points stemmed from my learning curve there. I can see how I progressed with it from the start of the app to the end, getting a little cleaner and better with it along the way.

In a rewrite, I would perhaps do things a little differently. I'm not sure doing all the requests for lists via socket was the right way to go. That being said, it works great, and I felt combining RESTful API calls with socket calls was doubling up unnecessarily, hence the choice I made.

#### Testing React

I have never tested on the front before, I didn't have time to make heads or tails of it here. The visual aspect of the front end combined with the complex compnent interactions, I was not able to even write passing tests for something as simple as "does the component load." I simply didn't have the time to figure that out here.

Interestingly, I am using notistack's useSnackbar hook, which allows Material-UI's snackbar components to stack. Something about the useSnackbar hook was breaking the most basic of tests and I have no clue why at the moment.

### Backend

The backend is Node, Express, and MongoDB (Atlas) with mongoose. Pretty standard here, until we get to the socket.io backend. The user related interactions are split into routes, controllers, and queries. I am also fairly new to MongoDB and Mongoose, having used it one other time before, so that was my second pain point.

I would have loved to have utilized more schema methods, statics, and query helpers than I did here. Time constraints hurried me along, but I think it would be much nicer and DRYer to have a lot of the common tasks consolidated on the schema model. I got to dabble here a bit, but would put more focus on it in a future app or rewrite. It was another "learn something new every day" experience.

PassportJS's local strategy is used for logging in, finicky as it's every been. I've used it quite a few times and I always seem to buttheads with the authenticate function. In this case, since the app is full stack, I had to work around passing response messages to the front end since express-flash isn't an option there. This involved the little-to-no-documentation failWithError and passReqToCallback options. I had to leave the authentication call in the router file because it was not playing nice when I tried to refactor it to the controller.

bcryptjs was used for password encryption. I put this right on the User schema as a "pre" save hook, so the password is always encrypted before it hits the database.

I also implemented my first custom react hook, useShowComponent. That may have been the most fun thing I worked on. It admittedly got more attention than it probably should have. I kept spending time refactoring it, adding features and the way it worked. I had to actually backpedal off of it because it was taking a lot of time and breaking things along the way, and I just needed the basic reason I wrote it in the first place to work for now. It was definitely inspirational and fun and I'll refine and reuse it in future projects.

The gist is that you pass it a component and it returns showComponent(), which you place anywhere you want the component to mount and eventually show, and showComponentWith(), which is a function you can wrap other elements and make them clickable, opening the source component, passing props to it, etc. There's more to it than that, but that it the main purpose.

It was inspired from issues I was having with the AddConnection dialog component. Since it launched from a popup menu, it had some funny behaviors. You couldn't use the tab key, because tab would close the popup, which closed AddConnection. So useShowComponent allowed me to easily mount AddConnection somewhere else, but call it from within the popup menu.

It was probably more fun for me to write and play with than it is for you to read about it. :)

#### Testing again

By far my weakest point in this project, more testing woes. I've done basic API endpoint testing before, so I used mocha to test major user endpoints and validations. The shopping list didn't have much to cover, but it is there too.

What I did not get to was the new and the esoteric. I did not get around to figuring out how exactly I would test socket.io, especially considering the front and back end interaction. It seems to test itself well enough along the way, so it wasn't a priority. I also ran into an issue with Mocha and Mongo. Connecting to a server and getting anything passed a MongoErr/AtlasError/Mocha timeout error was a hurdle. This was eventually solved, but it cut into a lot of time that I chose to spend working on the app rather.

So, weak testing is a sacrifice I own up to here. Between my lack of knowledge and the time spent figuring out Mongo and socket.io, it got backburnered.

## The wrap up

That's the quick overview of the application and what went on during the crunch development. I'm pretty happy with the direction. Not that I wouldn't do some things differently, but it was a very enjoyable experience and a project I hope to keep working on (or rewrite) passed this MVP requirement.
