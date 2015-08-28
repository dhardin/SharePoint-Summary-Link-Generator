var app = app || {};

app.LibraryView = Backbone.View.extend({
    template: _.template($('#collection-template').html()),

    events: {
        'update-sort': 'updateSort'
    },

    initialize: function(searchTerm) {
        this.collection = app.LibraryCollection;

        Backbone.pubSub.on('search', this.search, this);
        this.listenTo(this.collection, 'add, reset, remove, change', function() {
            if (app.filterOptions) {
                this.search(app.filterOptions);
            } else {
                this.render();
            }
        });

        if (searchTerm) {
            this.search({
                val: searchTerm
            });
        }
    },

    render: function(options) {
        var collection = false,
            isFiltered = app.filterOptions,
            numItems,
            groupBy = false;
        options = options || false;
        if (!options && isFiltered) {
            this.search(app.filterOptions);
            return;
        } else {
            collection = options.collection;
        }

        this.$el.html(!groupBy ? this.template() : this.groupTemplate());
        this.$items = this.$el.find('#items');

        collection = collection || this.collection;
        this.$items.html('');

        if (!isFiltered) {
            if (collection.length > 0) {
                rowItemCount = 0;
                rowNumItems = 0;
                itemsLeft = collection.length;

                collection.each(function(item) {
                    if (rowItemCount >= rowNumItems) {
                        rowNumItems = this.genRowNumItems(itemsLeft);
                        rowNumItems = rowNumItems != 5 ? rowNumItems : 3;
                        $row = $('<div class="row" data-equalizer></div>');
                        this.$items.append($row);
                        rowItemCount = 0;
                    }

                    responsiveClasses = this.genResponsiveClasses(rowNumItems || this.collection.length);
                    this.renderItem($row, item, responsiveClasses);
                    itemsLeft--;
                    rowItemCount++;
                }, this);
            } else if (app.fetchingData) {
                this.$items.html($('#fetchingItemsTemplate').html());
            } else {
                this.$items.html($('#noItemsTemplate').html());
            }
        } else {
            var totalItems = this.collection.length,
                numItemsDisplayed = collection.length;
            this.$items.html('Displaying ' + numItemsDisplayed + ' out of ' + totalItems);
            collection.each(function(item) {
                this.renderItem(item);
            }, this);
        }
         $(window).on('resize',function(e){
         	Foundation.libs.equalizer.equalize($('#items').find('.row'));
         });
        setTimeout(function(){
        	$(window).trigger('resize');
        },10);
        


    },



    renderItem: function($target, item, responsiveClasses) {
        var itemView = new app.ItemView({
            model: item
        });

        $item = $('<div class="' + responsiveClasses + '" ></div>');

        $item.append(itemView.render().el);
        $target.append($item).appendTo(this.$items);
    },
    genResponsiveClasses: function(numItems) {
        switch (numItems) {
            case 1:
                return 'col-xs-12';
            case 2:
                return 'col-xs-6';
            case 3:
                return 'col-xs-12 col-sm-4';
            case 4:
                return 'col-xs-6 col-sm-3';
            default:
                return 'col-xs-6 col-sm-3';
        }
    },
    genRowNumItems: function(numItems) {
        if (numItems <= 4) {
            if (numItems % 4 === 0) {
                return 4;
            } else if (numItems % 3 === 0) {
                return 3;
            } else if (numItems % 2 === 0) {
                return 2;
            } else {
                return 1;
            }
        } else if (numItems === 5){
            return 5;
        } else {
            return parseInt(app.config.max_row_col, 10);
        }
    },
    search: function(options) {
        if (options) {
            app.filterOptions = options;
            this.render({
                collection: this.collection.search(options),
                isFiltered: true
            });
        } else {
            app.filterOptions = false;
            this.render({
                collection: this.collection
            });
        }
    }
});
