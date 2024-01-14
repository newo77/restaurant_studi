// config.js
const getApiUrl = () => {
	if (process.env.NODE_ENV === 'production') {
		return 'https://votre-api-en-production.com'; // Remplacez par l'URL réelle de votre API en production
	} else {
		return 'http://localhost:3001/'; // URL de votre API en développement
	}
};

export { getApiUrl };
