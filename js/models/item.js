var app = app || {};

app.Item = Backbone.Model.extend({
    defaults: {
        description: '',
        id: '',
        title: '',
        iconClass: '', //ex: icon icon-magnify
        border: '',
        backgroundColor: '',
        imgUrl: '',
        order: 0,
        row: 0,
        col: 0
    }
});
