const fs = require('fs');
fs.writeFileSync('./.env', `REACT_APP_GITHUB_AUTH_TOKEN=${process.env.REACT_APP_GITHUB_AUTH_TOKEN}\n`);
