# Commitlint

Commitlint will validate commit messages according to the conventions of [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), with an addition to validate a task identifier (task ID) at the end of the message:

```javascript
/^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\([a-z-]+\))?: [a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]+ \([a-zA-Z0-9]{2,}-\d+\)$/;
```

Here is the documentation for each part of the regex:

-   `^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)`: a capture group that accepts one of the keywords indicating the type of commit:

    > common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
    >
    > -   `feat`: Use when adding new functionality to the project.
    > -   `fix`: Use when fixing a bug or problem.
    > -   `docs`: Use when updating project documentation.
    > -   `style`: Use when making changes that don't affect the code (eg formatting, spacing).
    > -   `refactor`: Use when making changes to the code that don't add new functionality or fix bugs.
    > -   `test`: Use when adding or modifying tests.
    > -   `chore`: Use when making changes to non-code files (eg configurations, build files).
    >
    > additional types: `build`, `ci`, `perf`, `revert`

-   `(\([a-z-]+\))?` - an optional capturing group that accepts a scope enclosed in parentheses, consisting of lowercase letters and hyphens
-   `: ` - two dots and a space
-   `[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/? ]+` - one or more letters, numbers, or spaces indicating the description of the commit
-   ` \([a-zA-Z0-9]{2,}-\d+\)$` - a scope in "AB-123" format, indicating the project and task number

Examples of commit messages that follow this pattern:

-   feat(component): add new feature (AB-123)
-   fix: resolve issue with login (CD-456)
-   docs(readme): update documentation (EF-789)
-   style: format code with prettier (GH-012)
-   refactor(api): simplify error handling (IJ-345)
-   test: add unit tests for login (KL-678)
-   chore: update dependencies (MN-901)

This regex will validate commit messages that follow the Conventional Commits conventions and have a task identifier at the end of the message. Note that this regex can be customized according to the specific needs of the project.
