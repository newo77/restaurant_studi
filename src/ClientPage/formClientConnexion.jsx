import React, { useState } from 'react';

function CreateAccountForm({ onCreateAccount }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [defaultGuests, setDefaultGuests] = useState(1);
  const [allergies, setAllergies] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateAccount({ email, password, defaultGuests, allergies });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Default guests:
        <input type="number" value={defaultGuests} onChange={(e) => setDefaultGuests(parseInt(e.target.value))} />
      </label>
      <br />
      <label>
        Allergies:
        <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create account</button>
    </form>
  );
}

export default CreateAccountForm;
