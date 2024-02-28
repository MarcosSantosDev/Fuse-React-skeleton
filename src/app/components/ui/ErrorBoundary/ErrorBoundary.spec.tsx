import { render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders children when there is no error', () => {
		render(
			<ErrorBoundary>
				<div>Test Child</div>
			</ErrorBoundary>
		);
		expect(screen.getByText('Test Child')).toBeInTheDocument();
	});

	it.only('renders error message when an error occurs', () => {
		const TestComponent = () => {
			throw new Error('Error: Test Error');
		};

		render(
			<ErrorBoundary>
				<TestComponent />
			</ErrorBoundary>
		);
		// expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
		expect(screen.getByText('Error: Test Error')).toBeInTheDocument();
	});

	it('logs error to console', () => {
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
		const TestComponent = () => {
			throw new Error('Test Error');
		};

		render(
			<ErrorBoundary>
				<TestComponent />
			</ErrorBoundary>
		);

		expect(errorSpy).toHaveBeenCalled();
	});
});
