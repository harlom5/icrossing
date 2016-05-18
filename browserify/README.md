What was learned from this project:

Why we need Browserify, and why it's awesome;
Where Browserify stands in relation to Webpack;
How to use Browserify to build a simple bundle;
How to use Browserify transforms to build not-so-simple bundles;
How to use NPM scripts to set up live reload and build tasks;
The basics of integrating Browserify with Gulp


Package.json
     npm init - creates the package file
     Use scripts to give NPM scripts a name space to be run
        npm run build|dev|serve


NPM modules used in pre gulp setup.
npm install --save-dev  (adds to dev dependencies)
npm install --save  (adds to dependencies)

Browserify
    browserify main.js -o bundle.js

Exorcist - build source mapping
    browserify main.js --debug | exorcist bundle.map.js > bundle.js

Watchify - rebuild bundle on any change (exactly like browserify except it rebuilds the bundle when any js file is changed)
    watchify main.js -o bundle.js -v

Beefy - rebuilds bundle on any change and live reloads the browser
    beefy main.js:bundle.js --live  :  http://localhost:9966


Gulp
    Gulp file created manually
    List dependenciees to be required in
    Write Config with directory mapping for builds
    Create bundle function - to chain npm modules for outputting files
    Create tasks - manage transforms and build processes




