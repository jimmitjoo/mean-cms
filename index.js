#! /usr/bin/env node

var exec = require('child_process').exec;

var command = process.argv.slice(2)[0];
var arg1 = process.argv.slice(2)[1];
var arg2 = process.argv.slice(2)[2];


/* Generate something */
if (command == 'generate') {

    if (!arg1) {
        console.log('Do you wanna generate something? Like a new "theme"?');
        console.log('In that case, run "mean generate theme <theme name>"');
        return;
    }

    if (arg1 == 'theme' && arg2) {
        console.log('Let\'s create a theme named ' + arg2);

        exec('mkdir themes/' + arg2);
        exec('cp -Ri vendor/generator/theme/ themes/' + arg2 + '/');
        exec('mkdir themes/' + arg2 + '/images');
        exec('mkdir themes/' + arg2 + '/tests');
    }

}


/* Run the app! */
if (command == 'run') {
    console.log('Allright! Let\'s start the app server!');
    exec('npm start');
}


// mean install <optional theme name>
if (command == 'install') {

    console.log('Installing Mean CMS... This can take a while, go grab a cup of coffee =)');

    exec('mkdir data');
    exec('pwd', function(err, stdout, stderr) {

        var dataDir = stdout.trim() + '/data';
        exec('mongod --dbpath ' + dataDir);

        /*exec('mongo', function(err, stdout, stderr){
            exec('use MEAN');
            exec('db.sitecollection.insert({"name":"Mean Default", "root_url": "127.0.0.1:3000", "root_path":"/", "theme_path":"themes/base/", "google_site_verification":"", "google_plus_publisher":"","company_name": "HACKson", "site_prefix": "mean_", "language": "se"})');
            exec('db.sitecollection.find().pretty()', function(err, stdout, stderr) {
                console.log(stdout);
            });
        });*/
    });



    if (!arg1) {
        process.chdir('themes/base');
    }
    else {
        process.chdir('themes/' + arg1);
    }

    // Install Bower dependencies
    exec('bower install', function(err, stdout, stderr) {
        console.log(stdout);
        console.log('Well, there was bower dependencies installed...');
    });

    // Install NPM dependencies
    exec('npm install', function(err, stdout, stderr) {
        console.log(stdout);
        console.log('And now we have installed the NPM dependencies!')
    });
}

// mean build <optional theme name>
if (command == 'build') {

    if (!arg1) process.chdir('themes/base');
    else process.chdir('themes/' + arg1);


    console.log('So let\'s create a build!')

    exec('gulp', function(err, stdout, stderr) {
        console.log(stdout);
        console.log('And there we\'ve got a new build!');
    });
}