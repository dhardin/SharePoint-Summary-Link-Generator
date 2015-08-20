var app = app || {};

app.Item = Backbone.Model.extend({
    defaults: {
        description: '',
        descriptionCenter: false,
        id: '',
        title: '',
        titleCenter: false,
        iconClass: '', //ex: icon icon-magnify
        border: '',
        borderRadius: '',
        backgroundColor: '',
        imgUrl: '',
        imgBorder: '',
        imgBorderRadius: '',
        imgBackgroundColor: '',
        imgSize: '',
        imgCenter: false,
        imgDisplay: '',
        stylesheetUrl: '',
        titleSize: 1,
        descriptionSize: 1,
        link: ''
    }
});
