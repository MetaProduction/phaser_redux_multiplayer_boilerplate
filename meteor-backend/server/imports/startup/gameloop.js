// Taken and modified for meteor use from https://github.com/tangmi/node-gameloop
// originally from https://github.com/timetocode/node-game-loop

let activeLoops = [];
let frameCount = 0;
let getLoopId = (function() {
	let staticLoopId = 0;
	return function() {
		return staticLoopId++;
	}
})();

module.exports.setGameLoop = function(update, tickLengthMs) {

	var loopId = getLoopId();
	activeLoops.push(loopId);

	/**
	 * Length of a tick in milliseconds. The denominator is your desired framerate.
	 * e.g. 1000 / 20 = 20 fps, 1000 / 60 = 60 fps
	 */
	tickLengthMs = tickLengthMs || 1000 / 20;
	/* gameLoop related variables */
	// timestamp of each loop
	var previousTick = Date.now();
	// number of times gameLoop gets called
	var actualTicks = 0;

	var gameLoop = function() {
		var now = Date.now();

		actualTicks++
		if (previousTick + tickLengthMs <= now) {
			var delta = (now - previousTick) / 1000;
			previousTick = now;

			// actually run user code
			update(delta);

			actualTicks = 0;
		}

		// do not go on to renew loop if no longer active
		if (activeLoops.indexOf(loopId) === -1) {
			return;
		}

		// otherwise renew loop in 16ms multiples, or immediately
		if (Date.now() - previousTick < tickLengthMs - 16) {
			Meteor.setTimeout(Meteor.bindEnvironment(gameLoop), 16);
		} else {
			Meteor._setImmediate(Meteor.bindEnvironment(gameLoop));
		}
	}

	// begin the loop!
	gameLoop();

	return loopId;
};

module.exports.clearGameLoop = function(loopId) {
	// remove the loop id from the active loops
	activeLoops.splice(activeLoops.indexOf(loopId), 1);
};
