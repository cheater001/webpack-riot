let riot = require('riot');

require('./styles/app.scss');
require('./tags/sample_output/sample_output.tag');

document.addEventListener('DOMContentLoaded', () => riot.mount('sample-output'));
