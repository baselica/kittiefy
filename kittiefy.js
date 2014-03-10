(function () {
    document.write = function(str) {
        document.write('apan');
    };

    function createScript(path, callback) {
        var tag = document.createElement('script');
        tag.src = path;
        if (callback) {
            tag.onload = tag.onreadystatechange = function () {
                tag.onreadystatechange = tag.onload = null;
                callback.call(this);
            }
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(tag);
    }

    var getDim = function(el) {
        return [
            el.attr('width') || el.width(),
            el.attr('height') || el.height()
        ];
    };

    function callback() {
        window.setTimeout(function() {
            $('img:not(.kfd)').each(function (index, element) {
                var $el = $(element);
                if ($el.attr('src').indexOf('logo') == -1) {
                    var dim = getDim($el);
                    $(element)
                        .attr('src', 'http://placekitten.com/' + dim[0] + '/' + dim[1])
                        .addClass('kfd');
                }
            });

            iframeCb.call(this);
        }, 4000);
    }

    function iframeCb() {
        $('iframe, object').each(function(index, element) {
            var $el = $(element);
            var dim = getDim($el);
            var tmp = '<img class="kfd" class=width="' + dim[0] + '" height="' + dim[1] + '" src="http://placekitten.com/' + dim[0] + '/' + dim[1] + '"/>';
            $el.replaceWith(tmp);
        });
    }

    if ('undefined' === typeof jQuery) {
        var version;
        if (document.addEventListener) {
            version = '2.1.0';
        } else {
            version = '1.11.0';
        }
        createScript('http://ajax.aspnetcdn.com/ajax/jQuery/jquery-' + version + '.min.js', callback);
    } else {
        callback.call(this);
    }
})();