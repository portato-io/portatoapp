import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

// Create a Firestore instance
const firestore = getFirestore();

interface Message {
  id: string;
  text: string;
  // timestamp: firebase.firestore.Timestamp;
}

interface ChatComponentProps {
  receiverId: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    // Subscribe to the "messages" collection in Firestore, filtered by receiverId
    const q = query(collection(firestore, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(newMessages);
    });

    return () => {
      // Unsubscribe from the Firestore listener when component unmounts
      unsubscribe();
    };
  }, [receiverId]);

  const handleSendMessage = async () => {
    // Create a new message document in Firestore
    await addDoc(collection(firestore, 'messages'), {
      text: newMessage,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      receiverId: receiverId,
    });

    // Clear the input field
    setNewMessage('');
  };

  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedReceiverId = event.target.value;
    // Update the selected recipient ID
    setReceiverId(selectedReceiverId);
  };

  return (
    <div>
      <select value={receiverId} onChange={handleRecipientChange}>
        <option value="receiver-1">Receiver 1</option>
        <option value="receiver-2">Receiver 2</option>
        {/* Add more options for different receivers */}
      </select>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
