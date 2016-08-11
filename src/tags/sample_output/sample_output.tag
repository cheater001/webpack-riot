require('./styles/sample_output.scss');

<sample-output>
    <h1>
        Hello again from RiotJS
        <span class="glyphicon glyphicon-search"></span>
        <i class="fa fa-american-sign-language-interpreting" aria-hidden="true"></i>
    </h1>
    <h2>Hiden by jquery111</h2>
    <i class="jpg"></i>
    <i class="svg"></i>
    <button onclick="{ click }">Click!</button>
    <script>
        $('sample-output').find('h2').hide();

        this.click = () => {
            {debugger}

            let a = 22;

            console.log(a);
        };

        this.on('mount', () => {
            $('sample-output h2').hide();
        });
    </script>
</sample-output>
