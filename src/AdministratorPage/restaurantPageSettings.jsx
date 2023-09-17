import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantSettingsForm() {
	const isAdmin = localStorage.getItem('role') === 'admin';
	const [capacity, setCapacity] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:3001/settings')
			.then((response) => {
				setCapacity(response.data.max_convives);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const restaurantData = {
			capacity: capacity,
		};
		axios
			.post('http://localhost:3001/settings', restaurantData)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
		setCapacity(capacity);
		alert(
			`Maintenant, le restaurant peux accueillir ${capacity} convives. Félicitation!`
		);
	};

	return (
		<>
			{isAdmin ? (
				<form onSubmit={handleFormSubmit}>
					<div className="container_form_restaurant_settings">
						<h2>Administration </h2>
						<div className="form_adm_settings">
							<div className="container_input_form_settings">
								<label>
									Capacité maximale de convives :
									<input
										type="number"
										min={'0'}
										value={capacity}
										onChange={(e) => setCapacity(e.target.value)}
									/>
								</label>
							</div>
							<div className="container_btn_multiple_tasks">
								<button type="submit">Enregistrer</button>
								
							</div>
						</div>
					</div>
				</form>
			) : (
				<div>Vous n'avez pas les droits requis pour accéder a cette page</div>
			)}
		</>
	);
}

export default RestaurantSettingsForm;
