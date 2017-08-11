const chalk = require('chalk');
const caller = require('caller-lookup');
const path = require('path');
const fs = require('fs');
const colors = [chalk.bgRed, chalk.bgBlue, chalk.bgMagenta, chalk.bgYellow, chalk.bgGreen, chalk.bgCyan];
let colorIndex = 0;

function Log(options = {}) {
	//Variable declaration - Taking from options, else default
	const prePath = path.resolve(__dirname, './index.js');
	const callArr = caller(prePath).split('\\');

	const name = options.name || callArr[callArr.length - 1];
	const color = options.color || getColorFromArray();
	const padding = options.padding || 10;
	const prefix = options.prefix || '->';
	const debug = options.debug || false;
	const debugPrefix = options.debugPrefix || 'DEBUG:';
	const filePath = options.file || undefined;

	//Only changeable in code
	const infoColor = chalk.white;
	const successColor = chalk.green;
	const warnColor = chalk.yellow;
	const errorColor = chalk.red;
	const debugColor = chalk.yellowBright;

	// Selects the color for the Logger from the color array.
	// Up to 6 loggers have unique colors.
	// If more than six, repeat the previous pattern.
	function getColorFromArray() {
		const colorName = colors[colorIndex];
		const index = colorIndex + 1;
		if (colors[index]) colorIndex++;
		else colorIndex = 0;
		return colorName;
	}

	// Wraps the name of the logger, colors it, and right-pads it.
	function padName(padOptions) {
		let len = name.length + 3; // I don't know why 3 works
		if (padOptions.color) { var pName = color('[' + name + ']'); }
		else var pName = '[' + name + ']';
		while (len < padding) { pName += ' '; ++len; }
		return pName;
	}

	// Logs either to console or file.
	function log(text, consoleOut, fileOut) {
		if (filePath) logToFile(text, fileOut);
		else logToConsole(text, consoleOut);
	}

	// Logs to console.
	function logToConsole(text, consoleOut) {
		console.log(' ' + padName({ color: true }) + ' ' + prefix + ' ' + consoleOut(text));
	}

	// Logs to file.
	function logToFile(text, fileOut) {
		const output = padName({ color: false }) + ' ' + fileOut + ' ' + prefix + ' ' + text + '\r\n';
		fs.appendFile(filePath, output, (err) => {
			if (err) throw err;
		});

	}

	this.info = (text) => log(text, infoColor, '[INFO]');
	this.success = (text) => log(text, successColor, '[SUCCESS]');
	this.warn = (text) => log(text, warnColor, '[WARN]');
	this.error = (text) => log(text, errorColor, '[ERROR]');
	this.debug = (text) => {
		//Enables debugging output only with debug option.
		if (debug) {
			log(debugPrefix + ' ' + text, debugColor, '[DEBUG]');
		}
	};
	return this;
}

module.exports = Log;