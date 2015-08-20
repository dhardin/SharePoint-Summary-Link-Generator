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

        if (this.model.get('border') != '') {
            this.$el.find('.vcard').css('border', this.model.get('border'));
        }
        if (this.model.get('borderRadius') != '') {
            this.$el.find('.vcard').css('border-radius', this.model.get('borderRadius'));
        }
        if (this.model.get('imgBorder') != '') {
            this.$el.find('.icon').parent('.panel').css('border', this.model.get('imgBorder'));
        }
        if (this.model.get('imgBorderRadius') != '') {
            this.$el.find('.icon').parent('.panel').css('border-radius', this.model.get('imgBorderRadius'));
        }
        if (this.model.get('imgBackgroundColor') != '') {
            this.$el.find('.icon').parent('.panel').css('background-color', this.model.get('imgBackgroundColor'));
        }
        if (this.model.get('titleSize') != 1) {
            this.$el.find('.fn').css('font-size', this.model.get('titleSize') + 'rem');
        }
        if (this.model.get('descriptionSize') != 1) {
            this.$el.find('.subheader').css('font-size', this.model.get('descriptionSize') + 'rem');
        }

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
