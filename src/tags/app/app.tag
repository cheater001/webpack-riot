require('../pages/home/home.tag');
require('../pages/about/about.tag');

<app>
    <nav>
        <a href="/">Home</a>
        <a href="/about/22">About</a>
    </nav>

    <view name="view"></view>

    <script>
        riot.route('/', () => {
            console.log('home');
            riot.mount(this.view, 'page-home');
        });

        riot.route('/about/?*', (id) => {
            console.log('about', id);
            riot.mount(this.view, 'page-about');
        });

        riot.route(() => {
            console.log('unknown');
        })
    </script>
</app>
