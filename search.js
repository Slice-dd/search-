;(function ($) {

    var defaults = {};

    function Plugin( element , options ) {
        this.element = $(element);
        this.options = $.extend({}, defaults , options);
        this.listData = [];
        this.init();
    }
    
    Plugin.prototype.init = function () {
        this.getData();
        this.hideList();
    };

    Plugin.prototype.createList = function () {
        if( this.listData instanceof Array ) {
            var li = '';
            for(var i = 0 ; i < this.listData.length ; i++) {
                li += '<li><a href="javascript:void(0)" class="a-link" data-href="bootstrap-table.html">'+this.listData[i].model+'</a></li>';
            }
            return li;
        }else {
            return '<li><a href="#">'+this.listData.MSG+'</a></li>'
        }
    };

    Plugin.prototype.getData = function () {
        var _this = this;
        var reg = /^\s+$/;
        var ul = '<ul class="search-list"></ul>';
        _this.element.parent().append(ul);
        _this.element.off('input propertychange');
        _this.element.bind('input propertychange' ,function () {
            var val = $(this).val();
            if ( val === '' || reg.test(val)){
                _this.listData = [];
                _this.element.parent().find('ul').css('display','none');
                _this.element.parent().find('ul').find('li').remove();
            } else {
                setTimeout(function () {
                    $.ajax({
                        type:_this.options.type,
                        url:_this.options.url + val,
                        success:function (data) {
                            _this.element.parent().find('ul').find('li').remove();
                            _this.listData =  JSON.parse(data);
                            _this.createList();
                            _this.element.parent().find('ul').css('display','block');
                            _this.element.parent().find('ul').append(_this.createList());
                        }
                    });
                },350)
            }
        });
    };
    
    Plugin.prototype.hideList = function () {
        var _this = this;
        $('body').on('click',function () {
            _this.element.parent().find('ul').css('display' ,'none')
        })
    };

    $.fn.Search = function ( options ) {
        return this.each(function () {
            return new Plugin( this , options )
        })
    }
    
})(jQuery);
