var app = app || {};

app.ItemView = Item.extend({
    template: _.template($('#item-template-card').html()),

    events: {
        'click .editBtn': 'edit',
        'click .deleteBtn': 'delete'
    },

    initialize: function(options) {

    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$description = this.$('.description');

        return this;
    },

    edit: function(e) {
        var id = this.model.get('id');
        app.router.navigate('edit/' + id, {
            trigger: true
        });
    },

    delete: function(e) {
        e.preventDefault();
        this.setStatus({
            status: 'Deleting',
            text: ''
        });
        (function(that) {
            that.$deleteBtn.addClass('disabled');
            that.$editBtn.addClass('disabled');
            setTimeout(function() {
                that.save({
                    method: 'delete',
                    callback: function() {
                        app.router.navigate('', {
                            trigger: true
                        });
                    },
                    trigger: false,
                    formData: {
                        ID: that.model.get('id')
                    }
                });
            }, 10);
        })(this);
    },

    onSortChange: function(e, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    }


});
