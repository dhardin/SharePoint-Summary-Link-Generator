var app = app || {};

app.grid = Backbone.Model.extend({
    defaults: {
        type: '',
        rows: '',
        cols: '',
        title: '',
        displayTitle: ''
    }
});
