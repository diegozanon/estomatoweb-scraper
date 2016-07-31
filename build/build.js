var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: '../**',
    platforms: ['osx64', 'win32', 'linux32'],
    version: '0.16.0'
});

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});