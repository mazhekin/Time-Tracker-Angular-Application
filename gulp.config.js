module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var report = './report/';
    var root = './';
    var temp = './.tmp/';
    var server = './src/server/';
    var deploy = './deploy/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var config = {
        client: client,
        server: server,
        temp: temp,
        root: root,
        build: './build/',
        deploy: './deploy/',

        allJsFiles: [
            './src/**/*.js',
            './*.js',
            '!' + client + 'report/**/*.*'
        ],
        lessFile: [
            client + 'styles/my-styles.less'
        ],
        // source files that does not need compiling, just copy
        lessFilesCss: [
            client + 'styles/style.css',
            client + 'styles/style-responsive.css'
        ],
        index: client + 'index.html',
        favicon: client + 'favicon.ico',
        js: [
          clientApp + '**/*.module.js',
          clientApp + '**/*.js',
          '!' + clientApp + '**/*.spec.js'
        ],
        css: [
            //temp + 'styles.css'
            temp + '*.css'
        ],
        fonts: [
            './bower_components/font-awesome/fonts/**/*.*',
            './bower_components/bootstrap/fonts/**/*.*',
            './bower_components/mazhekin-my-fontello/fonts/**/*.*',
        ],
        cssImages: [
            './bower_components/chosen_v1.4.0/*.png',
            './bower_components/iCheck/skins/square/aero.png',
            './bower_components/mazhekin-my-bootstrap-xeditable/clear.png'
        ],
        images: client + 'img/**/*.*',
        htmlTemplates: clientApp + '**/*.html',

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
        * Bower and NPM locations
        */
        wiredepDefaultOptions: {
            bowerJson: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],

        /**
        * Node settings
        */
        defaultPort: 7207,

        /**
        * Karma and testing settings
        */
        specHelpers: ['test/lib/**/*.js']
        // serverIntegrationSpecs: [client + 'tests/server-integration/**.spec.js'],

    };

    config.karma = getKarmaOptions();

    return config;

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                '**/*.module.js',
                '**/*.js',
                '../../' + temp + config.templateCache.file
                //config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors['**/!(report)/**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }

};