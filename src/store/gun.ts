import Gun from 'gun/gun';
import 'gun/sea';
import 'gun/axe';
import 'gun/lib/webrtc';
import unset from 'gun/lib/unset';
import open from 'gun/lib/open';

Gun.chain.subscribers = [];
Gun.chain.subscribe = function (subscriber) {
	let gun = this,
		at = gun._,
		subscribers = gun.subscribers;
	subscribers.push(subscriber);
	if (subscribers === 1) {
		gun.on(function (data, key) {
			for (let i = 0; i < subscribers.length; i += 1) {
				subscribers[i](data);
			}
		});
	}
	return function stop() {
		if (subscribers.length === 0) {
			// gun.off() // Should ideally be enabled, but not sure of side effects
		}
	};
};
export const gun = Gun();
gun.subscribe();
