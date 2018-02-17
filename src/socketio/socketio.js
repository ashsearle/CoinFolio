import * as io from 'socket.io-client';

const socket = io.connect('https://streamer.cryptocompare.com/');
//Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
//Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
//For aggregate quote updates use CCCAGG as market
//const subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
//socket.emit('SubAdd', { subs: subscription });

const subscribeToSocket = (subscription, cb) => {
  socket.on('m', message => cb(message));
  socket.emit('SubAdd', { subs: subscription });
}

const unsubscribeToSocket = (subscription) => {
  socket.emit('SubRemove', { subs: subscription });
}

export { subscribeToSocket, unsubscribeToSocket };