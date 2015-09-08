export npm_config_prefix=.npm/
export PATH=.npm/bin:$PATH
npm install -g bower grunt-cli
bower install
npm install
node_modules/.bin/karma start karma.conf.js --no-auto-watch --single-run --reporters=dots