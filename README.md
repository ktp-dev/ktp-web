# The Official Kappa Theta Pi Alpha Chapter Website

Made with :heart: by our brothers.


## Contents
* [Setup](#setup)
* [Useful Commands](#useful-commands)
* [Contributing](#contributing)
* [Sample React Component](#sample-react-component)
* [Routing](#routing)
* [MongoDB & Mongoose](#mongodb-and-mongoose)
* [Styled Components](#styled-components)

## Setup

1. [Get Docker](https://docs.docker.com/engine/getstarted/step_one/#/step-1-get-docker)
2. [Get Docker Compose](https://docs.docker.com/compose/install/)
4. Clone this repo: `git clone https://github.com/ktp-dev/ktp-web`
4. Change directory to the deploy repo: `cd ktp-web/deploy/`
5. Start whatever environment you want
    - Development
        - `docker-compose -f development.yml up -d`
        - **Your git repo will be linked to the development environment, so your local changes will be reflected with a container restart**
    - Production (More env data required)
        - `docker-compose -f production.yml up -d`
        - **NOTE: This takes care of setting up NGINX AND LetsEncrypt with the appropriate hosts and autorenewal**
6. Access `http://localhost:4000` and start developing!

## Useful Commands

#### Seeing container output
This will start the necessary containers and hook you into their output. In addition to being able to see what is happening, you can stop the containers easily by just Ctrl-Cing out of them.

`DEBUG=* docker-compose -f development.yml up -d`

#### Working in backend
When working exclusively on backend, you don't want to wait for Webpack to reload the frontend on each save, especially when you haven't changed anything there.

`APIWORK=true docker-compose -f development.yml up -d`

## Contributing
1. Clone the repository: `git clone https://github.com/ktp-dev/ktp-web`
2. Create a branch locally for your feature: `git branch my-feature`
3. Checkout your branch: `git checkout my-feature`  
    ----- _to branch and checkout in one command:_ `git checkout -b my-feature`
4. Implement your feature with as many commits as you'd like
5. Run `yarn run test` to test your code against our CI. This will ensure that your code is formatted well (it will ask you if you want to autoformat certain files) and complies with eslint.
6. Push your branch to GitHub: `git push origin my-feature`
7. On GitHub click "Open Pull Request"
8. Fill in the information for your pull request following the template
9. Tag 1-2 people that you think might want to review it
10. Get feedback, talk about the feedback, implement any agreed changes, commit them and push, repeat until you have all thumbs up (👍)
11. Squash and merge on GitHub


## Sample React Component
`MyComponent.js`:
```javascript
import React from 'react';
import styled from 'styled-components';
import { OtherComponent } from 'OtherComponent';
import {
	action1,
	action2
} from '../actions';

const Container = styled.div`
    background: ${props => props.theme.gradientOverlay}, ${props =>props.theme.primary}
    padding: 80px 0;
    textAlign: center;
`;

class MyComponent extends React.Component {
	constructor(props) {
		super(props); // Needed if using props in constructor
		this.state = {
			items: ['ItemA1', 'ItemA2', 'ItemA3'],
			keyPressed: false
		};
		this.props.action1(this.state.keyPressed);
	}

	handleEvent = (item) => {
		// Use setState if modifying state not in constructor
		this.setState({ keyPressed: true });
		this.props.action2(this.state.keyPressed);
	}
  
  	// Renders each item in the list
	renderItem(item) {
		return <OtherComponent onKeyPress={ this.handleEvent(item) } />;
	}
	// OR if using more than one component
	renderItem(item) {
		return (
			<OtherComponent2 onKeyPress={ this.handleEvent(item) }>
				<OtherComponent3 />
			</OtherComponent2>
		);
	}
  
	render() {
		const items = ['ItemB1', 'ItemB2', 'ItemB3'];
		return (
			<Container>
				{ items.map(this.renderItem) }
				{ this.state.items.map(this.renderItem) }
				<OtherComponent />
			</Container>  
		);
	}
}

mapStateToProps = ({ theme, user }) => {
	// Extract property from object
	const { color } = theme;
    return {
        user: user,
        color: color
    };
}

export default connect(mapStateToProps, {
	action1,
	action2
})(MyComponent);
```

## Routing

We use [Express](https://expressjs.com/) for our API routing. Express makes it really easy to declare and handle new routes.

Let's use authentication routes as an example.

### Declaring a Route

To create a route, we need a reference to the router, which we can get by simply importing it

````javascript
var router = require('express').Router()
````

Now, we can declare our route

````javascript
router.post('/login', function (req, res) {
    // Route Handler
});
````

### Sending Responses

Without actually responding to the request, the client will be left hanging. Luckily, it's easy to respond with Express.

````javascript
res.send({
    status: true
});
````

This is a decent response for a successful login request, but how do we handle errors?

````javascript
res.status(401).send({
    status: false,
    message: Responses.USER_EXISTS
});
````

Here we send back a 401 status code as well as an error message. Our practice for sending messages back to the client is to have a dedicated place in the `/responses/` folder. This is a nice abstraction for common messages.

It is important to have a good response back to the user.

### Exporting the Router

Finally, we must export our router like we do everything else

````javascript
module.exports = router;
````

### Exposing the Route
In `api.js`, we declare our handlers for groups of routes. Following our authentication example, we are putting all those routes into the authHandler.

````javascript
var authHandler = require('./api/auth.js'); // auth.js is where /login is declared
````

We can now tell our router to namespace these routes in a way.

````javascript
router.user('/auth', authHandler);
````

Now, all requests with `/auth` as a prefix will be directed to the authHandler.

## MongoDB and Mongoose

We use [Mongoose](http://mongoosejs.com/) to interface with [MongoDB](https://www.mongodb.com/), our database. MongoDB is a NoSQL database great for its flexibility, performance, and ease of use. Combined with Mongoose, it is easy to create schemas and query models.

Let's use a simplified version of our `User` schema as an example.

### Declaring a Schema

````javascript
var schema = new mongoose.Schema({
    full_name: String,
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email_verified: Boolean,
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
````

In the code above, we create a schema with 5 attributes of various types. You can see how we can declare the type, and optionally add qualifiers like whether the attribute is required, a default value for that attribute, as well as indices (for faster queries at the expense of extra disk space).

### Adding Methods

We can also add methods to the schema, allowing us to easily use our models for more than just encapsulation of data.

````javascript
schema.methods.checkPassword = function (supppliedPassword) {
    return bcrypt.compare(suppliedPassword, this.password);
}
````

This method checks the `suppliedPassword` with the password of the instance this function is called on: `userInstance.checkPassword('password')`. The bcrypt `compare` function is asynchronous, so this method actually returns a `Promise`. So, the call site for this method will look like this:

````javascript
userInstance.checkPassword('hunter2').then((res) => {
    // Passwords do match
}).catch((err) => {
    // Password didn't match
});
````

### Adding Middleware

Sometimes, it is necessary for middleware to run when using a model. For example, what if a password is updated? We can use middleware to ensure that the password is appropriately salted and hashed before saving.

````javascript
var passwordMiddleware = function(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
        return next();
    }).catch((err) => {
        console.error(err);
        return next(err);
    });
};

schema.pre('save', passwordMiddleware);
schema.pre('update', passwordMiddleware);
````

This declares this middleware to run before saving and before updating an instance of this schema

### Exporting the Model

Before this model can be used by anyone, we must initialize and export the model

````javascript
var model = mongoose.model('User', schema);

module.exports = model;
````

This initializes the model with the name 'User' to have this schema we have defined. It then exports it so it is available to anyone who imports this file.

## Styled Components

Styled components exist to remove the mapping between styles and components. They allow a user to write actual CSS in JavaScript. This combination of styles and components greatly simplifies component styling.

### Declaring a Component
````javascript
import React from 'react';
import styled from 'styled-components';

const MyTitle = styled.h1`
  color: green;
  font-size: 1.5em;
  text-align: center;
`;
````

The code above creates a react component called `MyTitle`. This component has all the CSS styles contained within the backticks. The color is orange, the font size is 1.5em and the text will be aligned in the center. MyTitle can now be used like a normal component:

    <div>
      <MyTitle>Styled Components are Awesome!</MyTitle>
    <div>

### Dissecting The Code:

`` styled.h1` `; `` is simply a function call where the string contained in the backticks is a parameter. This function renders the `<h1>` component in the DOM. Once you add the CSS styles inside the backticks, a React component is made containing those styles for your use.

### Styling all Components

Any existing can be made into a styled component (`<img>`, `<p>`, `<div>`, etc.). Even an already styled component can be styled. Just replace the `` styled.h1` `; `` function call with `` styled.div` `; `` or whichever component you wish to style.

### Using Props

Styled components can adapt based on props passed into them. For example we can declare a button like this

````javascript
const MyButton = styled.button`
  background: ${props => props.primary ? 'red' : 'white'};
  color: ${props => props.primary ? 'white' : 'red'};
  font-size: 1em;
  border-radius: 3px;
`;
````

Now we render MyButton:
    
    <MyButton primary>Primary</MyButton>
    <MyButton>Normal</MuButton>


The first MyButton has primary set to true so it will be white with a red background and the second has primary set to false so it will be red with a white background.

### More Information

If you'd like to learn more, documentation for styled components can be found [here](https://github.com/styled-components/styled-components)
