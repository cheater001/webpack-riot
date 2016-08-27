require('./styles/app.scss');
require('./tags/app/app.tag');
// require('./tags/sample_output/sample_output.tag');

document.addEventListener('DOMContentLoaded', () => {
    riot.mount('app');
    riot.route.base('/');
    riot.route.start(true);
});
