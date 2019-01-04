import subscribe from './socket-subscribe';

let socketInstance = null,
	fallback = false;

const createSocket = url => {
	let socket = new WebSocket(`ws://${url}`);

	socket.onmessage = ({data}) => {
		const payload = typeof data === 'string' ? JSON.parse(data) : data;
		subscribe.notifySubscribers(payload);
	}

	socket.onopen = () => {
		fallback = false;
	}

	socket.onclose = (s) => {
		fallback = true;
		longPolling(url);
	}

	return socket;
}

const longPolling = url => 
	fetch(`http://${url}`)
		.then(b => b.json())
		.then(response => {
			subscribe.notifySubscribers(response);

			if(fallback) {
				longPolling(url);		
			}
		});

const connect = url => {
	if(window.WebSocket) {
		fallback = false;
		if(!socketInstance) {
			socketInstance = createSocket(url);
		} else {
			socketInstance.refresh();
		}
		window.socketInstance = socketInstance; // dev only
	} else {
		fallback = true;
		longPolling(url);
	}
}

export default connect;