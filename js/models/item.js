var app = app || {};

app.Item = Backbone.Model.extend({
    defaults: {
        description: '',
        id: '',
        title: '',
        iconClass: '', //ex: icon icon-magnify
        border: '',
        borderRadius: '',
        backgroundColor: '',
        imgUrl: '',
        imgBorder: '',
        imgSize: '',
        imgDisplay: '',
        stylesheetUrl: '',
        titleSize: 1,
        descriptionSize: 1
    }
});
