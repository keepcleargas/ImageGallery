!function ($) {
    var ImageGallery = function (element, options) {
        this.$element = $(element);
        this.$input = this.$element.find(':file');
        if (options.gallery) {
            this.$div_gallery = options.gallery;
        }
        else {
            this.$div_gallery = $('.gallery');
        }
        if (this.$div_gallery == undefined||this.$div_gallery == null) {
            this.$div_gallery = $('<div id="image-gallery" class="row-fluid gallery"><ul class="thumbnails"></ul></div>');
            this.$element.after(
                this.$div_gallery
            )
        }
        this.$div_toolbar = $('<ol class="toolbar hide">'
            + '<li><a class="btn btn-mini image-delete">删除</a></li>'
            + '</ol>');

        this.fileContainer = [];
        this.lastIndex = 0;
        this.$remove = $('a.image-delete');
        this.listen();
    }

    ImageGallery.prototype = {
        listen:function () {
            var $toolbar = this.$div_toolbar;
            this.$div_gallery.find('li.image').live({mouseenter:function () {
                $(this).find('a').before($toolbar.clone().removeClass('hide'));
            },
                mouseleave:function () {
                    $(this).find(".toolbar").remove();
                }
            });
            this.$input.on('change.imageGallery', $.proxy(this.addFiles, this));
            this.$remove.live('click.imageGallery',this.imageRemove(this))
        },
        addFiles:function (e) {
            var files = e.target.files !== undefined ? e.target.files : (e.target.value ? { name:e.target.value.replace(/^.+\\/, '') } : null);
            for (var i = 0; file = files[i]; i++) {
                var path = file.name;
                if (isValidImage(path)) {
                    var render = new FileReader();
                    render.onload = (function (theFile, element) {
                        return function (e) {
                            element.addToGallery(e.target.result, element.lastIndex)
                            element.addToFileContainer(element.lastIndex, theFile);
                            element.lastIndex++;
                        }
                    })(file, this);
                    render.readAsDataURL(file);
                }
            }
            function isValidImage(image) {
                function isValid(text) {
                    return !(text == null || text.trim() == "");

                }
                if (isValid(image)) {
                    var ext = image.split('.').pop().toLowerCase();
                    return $.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) != -1;
                } else {
                    return true;
                }
            }
        },

        imageRemove:function(element){return function(e) {
            var id = $(this).closest('li.image').attr('id');
            element.removeFromGallery(id);
            element.removeFromFileContainer(id);
        }},
        removeFromGallery:function (index) {
            var $selectImage = this.$div_gallery.find('li.image[id="' + index + '"]');
            $selectImage.addClass('image-deleted');
        },
        addToGallery:function (imageTarget, lastIndex) {
            var $lastUl = this.$div_gallery.find('ul').last();
            if ($lastUl.find('li').length == 5) {
                $lastUl.after('<ul class="thumbnails"></ul>');
            }
            $lastUl.append('<li id="' + lastIndex + '" class="span2 image"> '
                + '<a class="thumbnail" href="#">'
                + '<img style="width: 205px; height: 135px;" src="' + imageTarget
                + '"></a></li> ');
        },
        removeFromFileContainer:function (index) {
            this.fileContainer[index] = null;
        },
        addToFileContainer:function (index, file) {
            this.fileContainer[index] = file;
        }
    }

    $.fn.imageGallery = function (options) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('imageGallery')
            if (!data) $this.data('imageGallery', (data = new ImageGallery(this, options==undefined?{}:options)))
            if (typeof options == 'string') data[options]();
        })
    }
    $.fn.imageGallery.Constructor = ImageGallery; //继承原型属性
}(window.jQuery);
