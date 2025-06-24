import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition"
    >
      Clicked {count} times
    </button>
  );
}
