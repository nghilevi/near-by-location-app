export npm_config_prefix=.npm/
export PATH=.npm/bin:$PATH
npm install -g bower grunt-cli
bower install
npm install
grunt test