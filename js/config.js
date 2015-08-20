var app = app || {};

var defaults = (new app.Item).defaults,
    key;
    
app.config = {
    url: '',
    guid: '',
    testin: false
};

app.property_map = {};

for (key in defaults) {
    app.property_map['ows_' + key.toLowerCase()] = key;
}
