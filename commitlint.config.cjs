/* eslint-disable security/detect-unsafe-regex */
const regexFullCommitMessage =
	/^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert|wip)(\([a-z-]+\))?: [a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]+ \([a-zA-Z0-9]{2,}-\d+\)$/;
const regexCommitType =
	/^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert|wip)(\([a-z-]+\))?$/;
const regexTicketOnSubject = /.* \([a-zA-Z0-9]{2,}-\d+\)/;

const commitTypes = [
	'feat',
	'fix',
	'docs',
	'style',
	'refactor',
	'test',
	'chore',
	'build',
	'ci',
	'perf',
	'revert',
	/**
	 * The "wip" type is not part of the "Conventional Commits"
	 *   */
	'wip'
];

const defaultErrorMessage = `
  Aborting commit. Your commit message is invalid.

  See some valid examples:
  - feat(component): add new feature (AB-123)
  - fix: resolve issue with login (CD-456)
  - docs(readme): update documentation (EF-789)
  - style: format code with prettier (GH-012)
  - refactor(api): simplify error handling (IJ-345)
  - test: add unit tests for login (KL-678)
  - chore: update dependencies (MN-901)
`;

module.exports = {
	extends: ['@commitlint/config-conventional'],
	plugins: ['commitlint-plugin-function-rules'],
	rules: {
		'type-empty': [0],
		'subject-empty': [0],
		'type-enum': [0],
		'function-rules/type-enum': [
			2,
			'always',
			parsed => {
				if (!parsed.type) {
					const message = `type may not be empty\n${defaultErrorMessage}`;
					return [false, message];
				}

				const isValidCommitType = regexCommitType.test(parsed.type);
				if (!isValidCommitType) {
					const message = `type must be one of [${commitTypes.join(
						', ',
					)}]\n${defaultErrorMessage}`;
					return [false, message];
				}

				const isValidCommitTicketMessage = regexTicketOnSubject.test(
					parsed.subject,
				);
				if (!isValidCommitTicketMessage) {
					const message = `add the jira ticket at the end of the commit\n${defaultErrorMessage}`;
					return [false, message];
				}

				const isValidCommitMessage = regexFullCommitMessage.test(parsed.header);
				if (!isValidCommitMessage) {
					return [false, defaultErrorMessage];
				}

				return [true];
			},
		],
	},
};
