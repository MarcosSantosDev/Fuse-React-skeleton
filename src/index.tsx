import { createRoot } from 'react-dom/client';

import { enableMocking } from '@root/app/configs/mocks/browser';

import App from './app/App';

import './i18n';

import './styles/app-base.css';
import './styles/app-components.css';
import './styles/app-utilities.css';

/**
 * The root element of the application.
 */
const container = document.getElementById('root');

if (!container) {
	throw new Error('Failed to find the root element');
}

/**
 * The root component of the application.
 */
const root = createRoot(container);

enableMocking().then(() => {
	root.render(<App />);
});
