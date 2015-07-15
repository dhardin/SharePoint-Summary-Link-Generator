var app = app || {};

var Router = Backbone.Router.extend({
    routes: {
        '': 'main',
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

    main: function() {
    	 if (!app.state_map.fetched) {
            //fetch data from server
            app.getData();
        }
          if (app.state_map.fetchingData) {
            app.router.navigate('fetch', true);
              app.state_map.dataLoadCallback = function() {
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
    },
    editItem: function(id) {
        var editUserPermissionView, item;

        app.state_map.fetchId = id || "";
        if (!app.state_map.fetched) {
            //fetch data from server
            app.getData();
        }

        if (app.state_map.fetchingData) {
            app.router.navigate('fetch', true);

            app.state_map.dataLoadCallback = function() {
                if (app.state_map.fetchId) {
                    app.router.navigate('edit/' + app.state_map.fetchId, true);
                } else {
                    app.router.navigate('edit/', true);
                }
            };
            return;
        } else if (id) {

            item = app.LibraryCollection.findWhere({
                id: id
            });
            if (!item) {
                app.router.navigate('edit/', true);
                return;
            }
        } else {
            item = new app.Item();
        }
        editItemView = new app.EditItemView({
            model: item
        });

        this.AppView.showView(editItemView);
    }

});



app.router = new Router({
    AppView: app.AppView
});


Backbone.history.start();
