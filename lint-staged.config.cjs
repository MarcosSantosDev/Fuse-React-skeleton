// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');

module.exports = {
  // this will check Typescript files
  './**/*.(ts|tsx)': () => 'npx tsc --noEmit',

  // This will lint and format TypeScript and JavaScript files
  './**/*.(ts|tsx|js)': absolutePaths => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map(file => path.relative(cwd, file));

    return [
      `npx eslint --fix ${relativePaths.join(' ')}`,
      `npx prettier --write ${relativePaths.join(' ')}`,
    ];
  },

  // this will Format HTML, MarkDown and JSON
  './**/*.(html|md|json)': absolutePaths => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map(file => path.relative(cwd, file));

    return [`npx prettier --write ${relativePaths.join(' ')}`];
  },
};
