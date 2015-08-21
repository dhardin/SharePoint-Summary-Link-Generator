var app = app || {};
app.dataLoadCallback = app.dataLoadCallback || [];
app.filterOptions = app.filterOptions || false;
app.filters = app.filters || {};
app.state_map = {
    fetched: false,
    fetchingData: false
};


app.processResults = function(results) {
    var temp_results = app.spData.processData(results),
        index = 0,
        i = 0;

    results = [];

    for (i = 0; i < temp_results.length; i++) {
        if (Object.keys(temp_results[i]).length == 0) {
            continue;
        }

        results.push({});
        index = results.length - 1;

        //make all keys lower case
        for (var key in temp_results[i]) {
            if (app.property_map.hasOwnProperty(key.toLowerCase())) {
                value = temp_results[i][key];
                key = app.property_map[key.toLowerCase()];
                results[index][key] = value;
            }
        }
    }
    return results;
};

app.getData = function() {
    var i;
    app.LibraryCollection = app.LibraryCollection || new app.Library([]);
    app.state_map.fetchingData = true;
    if (!app.config.testing) {
        app.spData.getData([{
                url: app.config.url,
                type: 'list',
                guid: app.config.guid,
                callback: function(results) {
                    var stylesheets = [];
                    app.state_map.fetchingData = false;
                    app.state_map.fetched = true;
                    results = app.processResults(results);
                    //set library to results
                    app.LibraryCollection.set(results);
                    stylesheets = _.unique(_.pluck(app.LibraryCollection.toJSON(), 'stylesheetUrl'));
                    app.addStylesheets(stylesheets);


                    setTimeout(function() {
                        if (app.dataLoadCallback) {
                            app.dataLoadCallback();
                            app.dataLoadCallback = false;
                        }
                    }, 1000);





                }
            }], 0,
            function() {
                app.state_map.fetched = true;
            });
    } else {
        //simulate server fetch
        setTimeout(function() {
            app.state_map.fetchingData = false;
            app.state_map.fetched = true;
            results = app.test_data || [];
            app.LibraryCollection.set(results);
            stylesheets = _.unique(_.pluck(app.LibraryCollection.toJSON(), 'stylesheetUrl'));
            app.addStylesheets(stylesheets);
            setTimeout(function() {
                if (app.dataLoadCallback) {
                    app.dataLoadCallback();
                    app.dataLoadCallback = false;
                }
            }, 1000);
        }, 100);
    }
};

app.addStylesheets = function(stylesheets) {
    if (stylesheets.length == 0) {
        return;
    }
    var stylesheetHtml = stylesheets.length > 1 ? stylesheets.reduce(function(prev, current) {
        return prev + current.length > 0 ? '<link rel="stylesheet" href="' + current + '"/>' : '<link rel="stylesheet" href="' + prev + '"/>';
    }) : stylesheets[0].length > 0 ? '<link rel="stylesheet" href="' + stylesheets[0] + '"/>' : '';

    $('head').append(stylesheetHtml);

};
