import path from 'path'
import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		viewportHeight: 1000,
		viewportWidth: 1280,
		specPattern: '**/*.cy.ts',
		video: false,
		screenshotOnRunFailure: false,

		setupNodeEvents(on, config) {
			on('file:preprocessor', vitePreprocessor())
		}
	},
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite'
		}
	},
	fixturesFolder: false,
});
