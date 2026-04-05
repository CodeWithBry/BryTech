const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/chat'
    : 'https://brytech.onrender.com/chat';

export async function sendChatMessage({ message, userId, history }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, userId, history }),
  });

  if (!response.ok) throw new Error('Server error');
  return response.json();
}
