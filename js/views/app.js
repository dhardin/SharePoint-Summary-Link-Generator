var app = app || {};


app.AppView = {
    showView: function(view) {
        if (this.currentView) {
            this.currentView.close();
        }

        this.currentView = view;
        this.currentView.render();

        $('#main').html(this.currentView.el);
        $(document).foundation({
            equalizer: {
                equalize_on_stack: true
            }

        });
        if (window.PIE) {
            $('.rounded').each(function() {
                PIE.attach(this);
            });
        }


    }
};

Backbone.pubSub = _.extend({}, Backbone.Events);

Backbone.View.prototype.close = function() {
    this.remove();
    this.unbind();
    if (this.onClose) {
        this.onClose();
    }
};
