import { useEffect, useRef, useState } from 'react';
import socketClient from 'socket.io-client';
import Toast from '../lib/toast';
import { getToken } from './authHelper';

const useChat = () => {
	const [messages, setMessages] = useState([]);
	const socketRef = useRef();
	useEffect(() => {
		const token = getToken();
		socketRef.current = socketClient(process.env.API_URL, {
			query: { token },
		});
		socketRef.current.on('getting', ({ messages }) => {
			const formatMessages = messages.map(message => ({
				id: message.id,
				userId: message.userId,
				message: message.message,
				timestamp: message.createdAt,
				username: `${message.user.firstName}`,
			}));
			setMessages([...formatMessages]);
		});
		socketRef.current.on('new_message', message => {
			setMessages(prevMessages => [...prevMessages, message]);
		});

		socketRef.current.on('authentication_error', error => {
			Toast('error', error);
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);

	const sendMessage = data => {
		socketRef.current.emit('new_message', data);
	};

	const getPriorMessages = () => {
		socketRef.current.emit('get_messages');
	};

	return { messages, sendMessage, getPriorMessages };
};

export default useChat;
