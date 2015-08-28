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
        this.$icon = this.$el.find('.icon-img');
        this.$iconContainer = this.$el.find('.icon-container');
        this.$vcard = this.$el.find('.vcard');
        this.$panel = this.$el.find('.panel');
        this.$title = this.$el.find('.fn');
        this.$description = this.$el.find('.subheader');

        if (this.model.get('border') != '') {
            this.$vcard.css('border', this.model.get('border'));
        }
        if (this.model.get('borderRadius') != '') {
            this.$vcard.css('border-radius', this.model.get('borderRadius')).addClass('rounded');
        }
        if (this.model.get('backgroundColor') != '') {
            this.$vcard.css('background-color', this.model.get('backgroundColor'));
        }
        if (this.model.get('imgCenter')) {
            this.$panel.parent().css('text-align', 'center');
        }
        if (this.model.get('imgBorder') != '') {
            this.$panel.css('border', this.model.get('imgBorder'));
        }
        if (this.model.get('imgPadding') != '') {
            this.$panel.css('padding', this.model.get('imgPadding'));
        }
        if (this.model.get('imgBorderRadius') != '') {
            this.$panel.css('border-radius', this.model.get('imgBorderRadius')).addClass('rounded');;
        }
        if (this.model.get('imgBackgroundColor') != '') {
            this.$panel.css('background-color', this.model.get('imgBackgroundColor'));
        }
        if (this.model.get('titleSize') != 1) {
            this.$title.css('font-size', this.model.get('titleSize') + 'rem');
        }
        if (this.model.get('titleCenter')) {
            this.$title.css('text-align', 'center');
        }
        if (this.model.get('descriptionSize') != 1) {
            this.$description.css('font-size', this.model.get('descriptionSize') + 'rem');
        }
        if (this.model.get('descriptionCenter')) {
            this.$description.css('text-align', 'center');
        }

        var that = this;
        $("<img/>") // Make in memory copy of image to avoid css issues
            .attr("src", this.model.get('imgUrl'))
            .load(function() {
                var defaults,
                    delta;

                $icon = $('<div class="' + that.model.get('iconClass') + '"></div>').appendTo('body');

                //set icon height/width to default
              /*  that.$icon.css({
                    width: this.width + 'px',
                    height: this.height + 'px'
                });*/

                defaults = {
                    top: parseInt($icon.css('background-position-y')),
                    left: parseInt($icon.css('background-position-x')),
                    imgWidth: this.width,
                    width: $icon.width(),
                    height: $icon.height()
                };

                delta = (that.model.get('imgSize') != '' ? that.model.get('imgSize') : defaults.height) / defaults.height;


                //set image source and update dimensions
                that.$icon
                    .attr('src', that.model.get('imgUrl'))
                    .css({
                        width: this.width * delta,
                        height: this.height * delta,
                        top: defaults.top * delta,
                        left: defaults.left * delta

                    });

                that.$el.find('.icon-img-container').css({
                    width: defaults.width * delta,
                    height: defaults.height * delta
                });
                $icon.remove();
            });



        return this;
    },

    edit: function(e) {
        var id = this.model.get('id');
        app.router.navigate('edit/' + id, {
            trigger: true
        });
    },

    /* delete: function(e) {
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
     },*/

    onSortChange: function(e, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    }


});
