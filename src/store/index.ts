import Gun from 'gun/gun';
import { gun } from './gun';
import { writable } from 'svelte/store';
// DB
export const db = gun;

// User
export const user = db.user().recall({ sessionStorage: true });

// Username
export const username = writable('');
let alias = '';

user.get('alias').on((value) => {
	username.set(value);
});

db.on('auth', async (event) => {
	alias = await user.get('alias');
	username.set(alias);
});

function customStore(ref, methods = {}) {
	let store = {};
	const subscribers = [];

	function publish(data, key) {
		if (ref._.get === key) {
			// for gun.get(key)
			store = data;
		} else if (data) {
			// for gun.get(key).map()
			store[key] = data;
		} else {
			delete store[key];
		}
		for (let i = 0; i < subscribers.length; i += 1) {
			subscribers[i](store);
		}
	}

	function subscribe(subscriber) {
		subscribers.push(subscriber);

		// Publish initial value
		subscriber(store);

		// Add listener to gun reference
		ref.on(publish);

		// return cleanup function to be called on component dismount
		return () => {
			const index = subscribers.indexOf(subscriber);
			if (index !== -1) {
				subscribers.splice(index, 1);
			}
			if (subscribers.length === 0) {
				ref.off();
			}
		};
	}

	return { ...methods, subscribe };
}

export const matchByDate = {
	// lexical queries are kind of like a limited RegEx or Glob.
	'.': {
		// property selector
		'>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 24).toISOString() // find any indexed property larger ~3 hours ago
	},
	'-': 1 // filter in reverse
};

export const globalFlashes = db.get('flashes');
export const localFlashes = db.user().get('myflashes');

export const chatMessages = (chatRef) => {
	return customStore(chatRef.map(), {
		add: (content) => chatRef.get(new Date().toISOString()).put({ content, author: alias })
	});
};
