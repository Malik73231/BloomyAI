import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const res = await axios.post('/api/chat', { messages: newMessages });
    setMessages([...newMessages, res.data.reply]);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Chat with your BloomyAI Girlfriend 💬</h2>
      <div style={{ minHeight: '200px', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Say something..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}