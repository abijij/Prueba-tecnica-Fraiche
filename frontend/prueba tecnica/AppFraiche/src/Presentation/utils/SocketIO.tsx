import io from 'socket.io-client';

const socket = io('http://18.190.64.227/orders/delivery');
export default socket;