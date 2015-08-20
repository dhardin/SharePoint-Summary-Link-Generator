var app = app || {};

var Router = Backbone.Router.extend({
    routes: {
        '': 'main',
        'setup/:params': 'setup',
        'new/': 'editItem',
        'new/*': 'editItem',
        'edit/:id': 'editItem',
        'edit/*': 'editItem',
        'fetch': 'fetch',
        '*404': 'error'
    },

    initialize: function(options) {
        this.AppView = options.AppView;
    },
    setup: function(params) {
        var i, param_map = {}, param;
        app.state_map.fetched = false;
        app.state_map.fetchingData = false;

        params = params.split('&');
        for(i = 0; i < params.length; i++){
            param = params[i].split('=');
            param_map[param[0]] = param[1];
        }

        for(key in param_map){
            app.config[key] = param_map[key];
        }

        app.router.navigate('', true);
    },
    main: function() {
        if (!app.state_map.fetched) {
            //fetch data from server
            app.getData();
        }
        if (app.state_map.fetchingData) {
            app.router.navigate('fetch', true);
            app.dataLoadCallback = function() {
                app.router.navigate('', true);
            };
            return;
        }

        var libraryView = new app.LibraryView();
        this.AppView.showView(libraryView);
    },
    error: function() {
        var errorView = new app.ErrorView();
        app.router.AppView.showView(errorView);
    },
    fetch: function() {
        var fetchingDataView = new app.FetchingDataView();

        this.AppView.showView(fetchingDataView);
    }
});



app.router = new Router({
    AppView: app.AppView
});


Backbone.history.start();
