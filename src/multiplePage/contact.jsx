import React, { useState } from 'react';

function ContactForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		alert('Votre message à été envoyé avec succès !');
		setName('');
		setEmail('');
		setMessage('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div id="container_form_contact">
				<h2>Contactez-nous</h2>
				<div className="form_contact">
					<div className="container_input_form_contact">
						<label>
							Nom:
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
					</div>
					<div className="container_input_form_contact mt15px">
						<label>
							Email:
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
					</div>{' '}
					<div className="container_input_form_contact mt15px">
						<label>
							Message:
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</label>{' '}
					</div>
					<div className="container_btn_submit_contact mt15px">
						<button type="submit">Envoyer</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default ContactForm;
