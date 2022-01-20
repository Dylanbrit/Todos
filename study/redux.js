// Redux
//
// Redux, just like component state, is designed to manage the state of our application
// State is data that changes, and we need a way to change the data and a way to get it out and render it
// For more complex state-managing applications, we want to use redux instead of component state
// In more complex apps, we may not have a central parent App that holds all the components where our state can live
// Using component state, we also run into issues with app reusability
// If we want to render an instance of a component in header we would have to call it there, then pass all the props it needs through header
// This can get tough to manage as we pass things down the line through more than one step
// With Redux, we can render without having to pass props down from the parent
// There is a global Redux state container that a component can get its props from, instead of needing props passed down to every instance
// There is nothing wrong with props- we will still continue to use props
// We just want to avoid having to pass props down a long chain of components jsut to get to the last component
// Redux is a state container- there is an object we can change and read from
// Each component can grab data from the store or change data on the store
// Instead of the components communicating with each other a lot, they are communicating with the store
// redux.js.org
// Install redux
// Import createStore from the 'redux' library
// We only need to call createStore once to create the store and then we don't need to call it again
// We set up a store variable to hold our createStore call
// We pass a function into createStore, which gets called once right away
// Inside of this callback we set the state
// The getState method that exists on store allows us to get our object back from inside state
// Actions allow us to change the React store
// An Action is an object that gets sent to the store
// This object describes the type of action we would like to take- i.e. add, subtract, reset
// To create an Action, we make an object
// Inside the object, we provide a type as a key and set it to the name, i.e. { type: 'INCREMENET' } to increment a count
// To call this, we use a method on store- store.dispatch() - with out object inside as an argument
// When we dispatch an action, our callback function gets called again
// The second argument inside our callback function in createStore is 'action', which is where we access our action object
// Inside of our function, we use an if statement to see if the action type is equal to the one we are dispatching
// If it is not equal, that means that it is our first time our function is running so we just return the default state
// If it is equal, we can change the state
// To do this, we return a new object, and set our property equal to state.property with the change
// We do not want to directly change the state, instead we use the values to compute the new state, and that is what gets returned
// Moving forward, we will be using the switch statement to check our dispatches, since they handle much more conditionals cleaner
// Example below =====>
const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': 
            return {
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                count: state.count - 1
            }
        case 'RESET':
            return {
                count: state.count = 0
            }
        default: 
            return state
    }
})

store.dispatch({
    type: 'INCREMENT'
})

store.dispatch({
    type: 'INCREMENT'
})

store.dispatch({
    type: 'RESET'
})

store.dispatch({
    type: 'DECREMENT'
})

// Actions are our way of communicating with the store. They are objects that have a type property that describes them
// When we create the action object, we use store.dispatch() to get it to the store
// Every time we dispatch an action to the store, we are resetting our state, even if it stays the same
// Our state gets set initially to set up the default state and one time for every store.dispatch call
// Every time we dispatch an action call we access it as a second argument in createStore
// So teh first argument in our store is the state, the second argument is the action taken on it
// Since we have access to all of our actions inside createStore, we can check the type of the action being passed in
// We will have many different actions being passed in, so we need to use some conditional logic to see what we want to do
// If the type matches one of the actions, we run some code. If it matches a different one, we run that code
// If it matches none of them, that means there is no action so the normal state is returned
// Now we can read from and change the state inside the store!
// If we want to watch for changes every time the state changes, we can use store.subscribe()
// store.subscribe() takes a function as its argument, and inside of there you can pass whatever you want to happen
// The return value of store.subscribe() is also how we unsubscribe
// We just save it to a variable so that it becomes a function that can be called, and then we just call it
// Even though we unsubscribe, the state is still changing when we dispatch an action to it!!!
// The only thing that happens with unsubscribe is that we stop getting notified about the state changing
// We are going to add more properties to our dispatch actions so that we can pass information in
// We can name the property whatever we want, and then just pass in the info we want
// Say we add an incrementBy property to the INCREMENT dispatch- we can access that property value thru the action object in our createStore argument
// We can access it by using action.incrementBy
// Example below =====>
switch (action.type) {
    case 'INCREMENT':
        const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
        return {
            count: state.count + incrementBy
        }
    case 'DECREMENT':
        return {
            count: state.count - 1
        }
    case 'RESET':
        return {
            count: 0
        }
    default: 
        return state
}
// We can store the value of action.incrementBy to a variable
// We can check to make sure the user passed in a valid number before changing our state
// If the typeof the value passed into incrementBy in the INCREMENT dispatch action is a valid number, we increment by the number passed in
// If the user did not pass in a number, we just default to incrementing by 1
// Then we just add the value of that variable to the state.count to update the state

// Action generators- functions that return action objects
// These are very simple functions that just takes input in and returns the new action object
// Example below-

const incrementCount = (payload = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
    }
}
store.dispatch(incrementCount({ incrementBy: 5 }))

// When we want to use custom properties, such as incrementBy, we pass it in to our function call in object form with the prop name and the value we want to input
// Inside our action generator, we add an argument that has a default that is set to an empty object
// This argument is the object that was passed into our function as the input that contained incrementBy
// The reason we set the object's default value to an empty object is because we our trying to access a property off of an object in our code
// When we try to access the value of payload.incrementBy to set incrementBy, we are trying to access a property on an object
// Without setting the argument to at least an empty object, we will get an error since there cannot be a property on something that is undefined
// On the action object we need our type, so that we can match it inside the store, and our custom property
// Inside our custom prop is where we establish our default, so that if nothing is passed in we can default to whatever we want
// We do exactly what we did in our store to check the type of and set a default, except inside of our action generator
// If the typeof our input incrementBy property is a number we set incrementBy equal to that number, otherwise we set it to 1, or whatever we want
// Then, in the store, we can access incrementBy off of the action object passed in

// If we want to simplify and destructure our action generator, we can do it like this example below-
const incrementCount = ({ incrementBy = 1 } = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy: incrementBy
    }
}
// We know that an object is passed in, so instead of naming the object, we can just access the property we want directly
// We can set up a default by setting incrementBy = 1, so that if there is an object but it does not include incrementBy it will be set to 1
// We still set the argument equal to an empty object because if there is no object provided the default will be an empty object so that there is no incrementBy and it will default to 1 anyway
// Since we are handling all of our default behavior inside the function argument, we can get rid of our typeof conditional code

// Reducers
//
// The function we pass inside our store is called a reducer
// Actions describe the fact that something happened, but don't specify how the app state changed in response- this is the reducer's job
// Key attributes of reducers:
// Reducers are pure functions- the output is only determined by the input, it does not rely on values from outside the reducer scope- just input, state, and action
// Never directly change state or action- instead of mutating directly, read off of them and then return an object representing new state
// Mutating the state directly will have unwanted effects
// Instead of passing our reducer function directly into createStore, we can break them out into their own functions
// This allows us to have more complicated apps and multiple states to keep track of, instead of trying to do it all inline
// Instead we use combineReducers, where we pass the return value into createStore
// On the combineReducers object, we define what we want our redux store to look like