export function hapticBuzz() {
	if (window.navigator.vibrate) {
		window.navigator.vibrate(30);
	}
}

export function hapticBuzzLong() {
	console.log('hapticBuzz');
	if (window.navigator.vibrate) {
		window.navigator.vibrate(200);
	}
}

export function hapticInvalid() {
	if (window.navigator.vibrate) {
		window.navigator.vibrate([30, 100, 30, 100, 30]);
	}
}

export function stopHaptic() {
	if (window.navigator.vibrate) {
		window.navigator.vibrate(0);
	}
}
