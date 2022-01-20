// Package.json
// 
// package.json holds a list of all of our dependencies and other things we use to make our project work
// When we install something locally instead of globally, we can't run the command from the terminal anymore
// Instead, we set up scripts in package.json where we can define how we use the dependencies
// Our scripts object is full of shortcut scripts that we don't want to type out anymore
// Our dependencies object is full of the different things we have downloaded locally for the app
// We run webpack out of package.json, and then configure what we want webpack to do inside of the webpack.config filw
// We want to use local instead of global modules for three reasons-
// 1. All of our dependcies are in package.json so if someone wants to use our app they will know what to install to run it
// 2. We can use different versions of things for different apps
// 3. We can use scripts to define the things we want to do
// To get webpack to watch for changes to the file we are working on, set "build" to "webpack --watch"
// To set up our devServer script:
// We can remove build-babel
// We can remove --watch mode from build in package.json since our new script will be watching
// We add a dev-server key with webpack-dev-server as the value
// Now we don't need to use two terminal tabs to run build and serve, since webpack-dev-server does both
// Now in the terminal we can just run npm run dev-server
// We keep build in as a script because if we ever delete our bundle, build is going to recreate it for us even though dev-server doesn't

// Webpack.config
//
// Webpack allows us to organize our JS, so that when we run our app through webpack, we get a single JS file back- bundle
// bundle contains all of our dependencies and application code, meaning we only need one script tag
// Allows us to set up webpack to meet the needs of our file
// Webpack can run babel for us
// We need a configuration file when we are running webpack as a script in our package.json
// File NEEDS to live in the root of our folder and NEEDS to be called webpack.config
// Webpack.config is a node script so we have access to everything that would be in a node js application
// We use a little bit of node in webpack.config
// In order to get webpack working we need to provide an entry point- where does the app kick off
// We also need to provide an output for the final bundle file
// We provide all of the configuration details for our webpack build on the modules.export object
// modules.export is a node thing, it is a way to expose something to another file
// Webpack grabs this file, runs it, and has access to whatever we put on this object
// entry is where webpack should start, in this case it is app.js inside src folder
// Online documentation for this can be found at webpack.js.org under Documentation
// output is set to an object and we have to provide two things- path and filename
// filename can be anything we like, such as bundle.js (very common name)
// path is the absolute path on our machine to where we want to output the file
// We get alll of our code into one JS file calledd the bundle, and we want to put it in the public folder in this project
// It gets a little tricky because we need to provide an absolute path and that is different for everyone's machine
// We use __dirname which contains the path to the current location
// We use a node function that lets us join together two paths- the aboslute path and the path to the public folder
// The function is path.join(), it is a JS method and we pass in the arguments we want joined together
// We make a constant called path and access teh module code by using require()
// Inside of require we put 'path'
// Then we can use path.join(__dirname, 'public') as the value for the path key inside our output object
// Webpack provides import/export
// Another thing we can do is run a devtool that will help us identify exactly where an error occurs
// Inside module.exports, we can add devtools: 'eval-cheap-modules-source-map' (or something like that)
// dev-server is something webpack can run to emulate its own server
// First, we install locally webpack-dev-server@ the latest version
// Then in webpack.config, we set up contentBase on the devServer object- this lets us tell dev-server where it can find our public files
// devServer is an object that we set up inside module.exports
// The only key we really need is contentBase, where we provide our absolute path to the public folder using path.join(__dirname, 'public')
// In package.json we just set up a script for it so that we can run it

// React/ReactDOM
//
// In order to use React and ReactDOM, we need to install the latest versions of React and ReactDOM and then import them into our code
// After doing that, we need to install and integrate babel so that our code can be translated and repurposed for all browsers

// Babel
//
// A loader lets you customize the behavior of webpack when it loads a certain file
// We use this to run our code we write through babel
// We also use loaders for CSS and SCSS
// When our file is run through babel, our ES6 gets converted to ES5 and our JSX gets converted to JS, so that all machines can read it
// We have installed babel-cli before, and now we want to install babel-core
// Babel-core is very similar to babel-cli
// Babel-cli allows us to run babel from the command line, and babel-core allows us to run babel from tools like webpack
// It does not have any funcitonality on its own, so we need to configure it to use the presets we picked out
// We also install babel-loader, which is a webpack plugin that allows us to teach webpack how to run babel when webpack sees certain files
// We set up our configurations for babel on the module object under module.exports
// The module rules property lets us set up an array of rules
// This lets us define how we want to use our loaders
// Inside the rules array, we create an object for each loader
// Inside the object we provide the loader we're trying to configure as well as the test that states what files we want to run the loader on
// We use a regular expression inside the test key to distinguish which files we are targeting
// We also provide exclude, which lets us exclude certain files, such as node_modules, which has already been ran through babel
// Now we have told webpack to run babel, but babel doesn't do anything bu default and babel doesnt know to use the presets
// What we need to do to set up the presets is set up a new configuration file- .babelrc
// .babelrc is a json file and it allows us to take all of the arugments we passed into the command line and put them in there
// Inside of an object, we just define a presets key, whose value is an array that contains our presets
// Our two presets in this case are env and react
// Whenever this project runs babel, now webpack knows to use these two presets
// There's a babel preset that allows me to use arrow functions in my components- their "this" binding is bound to the class instance
// This means we don't have to manually bind
// In .babelrc, we set up a plugins array inside our object
// Inside of there, we provide the name of the plugin we want to use, transform-class-properties
// Now we don't have to manually bind functions inside the constructor
// We also don't need a constructor at all now
// We can set things as a key/value pair