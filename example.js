var logger = require('./index.js');
var server = new logger({ name: 'server' });
var example = new logger({ name: 'example' });
var design = new logger({ name: 'design' });
server.info('Server starting...');
server.success('Success! Server started.');
example.debug('Initializing socket with { foo: "bar" }.'); //Won't be displayed
example.debug('We are online too!'); // Won't be displayed either
example.warn("WARNING! If you don't take immediate action, it could cause an...");
example.error("...Error.");
design.info('outputjs is designed to be lightweight and flexible!');
design.info("With automatic color and name selection, you don't need a config!");
design.info('outputjs also provides automated padding, so your output looks and feels fancy!');
design.success('Give it a try now!');