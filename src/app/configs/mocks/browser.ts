import { env } from '@root/env';
import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

const worker = setupWorker(...handlers);

export async function enableMocking() {
	if (env.MODE === 'development' && env.VITE_MSW_ACTIVATED === 'true') {
		return worker.start({
			onUnhandledRequest: 'bypass'
		});
	}
	return Promise.resolve();
}
