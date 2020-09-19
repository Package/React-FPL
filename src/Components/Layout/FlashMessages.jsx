import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap';
import { DataContext } from '../../context/DataContext'

export const FlashMessages = () => {
	const { messages, setMessages } = useContext(DataContext);

	// Nothing to display
	if (messages.length === 0) {
		return false;
	}

	return (
		<div>
			{messages.map((msg, index) => (
				<Alert key={index} variant={msg.type}>
					{msg.message}
				</Alert>
			))}
		</div>
	)
}
