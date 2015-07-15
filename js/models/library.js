var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Item,
    initialize: function() {
    }
});
