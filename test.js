const test = require('unit.js');
const chalk = require('chalk');
const fs = require('fs');
const logger = require('./index.js');

//Can be changed
const testColor = { name: 'Cyan', color: chalk.bgCyan };
const testFile = 'outputTest.txt'

beforeEach(function() {
    test.spy(console, 'log');
    test.spy(fs, 'appendFile');
});

afterEach(function () {
	console.log.restore();
	fs.appendFile.restore();
	if(fs.existsSync(testFile)) fs.unlinkSync(testFile);
});

describe('Default Console Logger', function() {
	const logger = getLogger();
	const log = getLogObject(logger);
	testForOutput(log);
})
describe('Custom Console Loggers', function() {
	describe('Logger with custom name', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { name: 'CustomNaming'});
		testForOutput(log);
	})
	describe('Logger with custom padding', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { padding: 20});
		testForOutput(log);
	})
	describe('Logger with custom color ('+testColor.name+')', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { format: testColor.color});
		testForOutput(log);
	})
	describe('Logger with custom prefix', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { prefix: '-|->>'});
		testForOutput(log);
	})
	describe('Logger with debug enabled', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { debug: true});
		testForOutputWithDebug(log);
	})
	describe('Logger with debug & debugging prefix enabled', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { debug: true, debugPrefix: 'DD:'});
		testForOutputWithDebug(log);
	})
})
describe('Default File Logger', function() {
	const logger = getLogger();
	const log = getLogObject(logger, { file: testFile});
	testForOutputToFile(log);
});
describe('Custom File Loggers', function () {
	describe('Logger with custom name', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { file: testFile, name: 'CustomNaming'});
		testForOutputToFile(log);
	})
	describe('Logger with custom padding', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { file: testFile, padding: 20});
		testForOutputToFile(log);
	})
	describe('Logger with custom prefix', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { file: testFile, prefix: '-|->>'});
		testForOutputToFile(log);
	})
	describe('Logger with debug enabled', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { file: testFile, debug: true});
		testForOutputToFileWithDebug(log);
	})
	describe('Logger with debug & debugging prefix enabled', function() {
		const logger = getLogger();
		const log = getLogObject(logger, { file: testFile, debug: true, debugPrefix: 'DD:'});
		testForOutputToFileWithDebug(log);
	})
})







function getLogger() {
	return logger;
}

function getLogObject(logger, options) {
	log = new logger(options);
	return log;
}

function testForOutput(log) {
	it('should output when calling info, success, warn, and error function', function() {
		log.info("Hey, a unit test!");
		log.success("Hey, a unit test!");
		log.warn("Hey, a unit test!");
		log.error("Hey, a unit test!");
		test.assert.equal(console.log.callCount, 4);
	});
}

function testForOutputWithDebug(log) {
	it('should output when calling debug, info, success, warn, and error function', function() {
		log.debug("Hey, a unit test!");
		log.info("Hey, a unit test!");
		log.success("Hey, a unit test!");
		log.warn("Hey, a unit test!");
		log.error("Hey, a unit test!");
		test.assert.equal(console.log.callCount, 5);
	});
}

function testForOutputToFile(log) {
	it('should output info, success, warn, and error to the file', function() {
		log.info("Hey, a unit test!");
		log.success("Hey, a unit test!");
		log.warn("Hey, a unit test!");
		log.error("Hey, a unit test!");
		test.assert.equal(fs.appendFile.callCount, 4);
	});
}

function testForOutputToFileWithDebug(log) {
	it('should output debug, info, success, warn, and error to the file', function() {
		log.debug("Hey, a unit test!");
		log.info("Hey, a unit test!");
		log.success("Hey, a unit test!");
		log.warn("Hey, a unit test!");
		log.error("Hey, a unit test!");
		test.assert.equal(fs.appendFile.callCount, 5);
	});
}