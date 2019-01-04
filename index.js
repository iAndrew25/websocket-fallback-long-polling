import connect from './socket';
import socketSubscribe from './socket-subscribe';

socketSubscribe.subscribe('index.js', {
	LONG_POLLING: () => console.log('LONG_POLLING'),
	WEB_SOCKET: () => console.log('WEB_SOCKET')
});

connect(URL);