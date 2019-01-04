let subscribers = {};

const subscribe = (id, options = {}) => {
	if(!id || !Object.keys(options).length) return;
	const emptyCb = () => {};

	Object.keys(options).forEach(subscription => {
		subscribers[subscription] = {...subscribers[subscription],
			[id]: options[subscription] || emptyCb
		}
	});
};
const unsubscribe = (type, id) => {
	const subscriber = subscribers[type];

	if(subscriber) {
		delete subscriber[id];
	}
}

const notifySubscribers = payload => {
	if(payload.type) {
		const msgType = subscribers[payload.type];

		if(msgType) {
			Object.keys(msgType).forEach(item => msgType[item]());
		}
	}	
}

export default {
	subscribe,
	unsubscribe,
	notifySubscribers,
};