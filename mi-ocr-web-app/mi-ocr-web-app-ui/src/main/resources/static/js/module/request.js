define('request', ['jquery','layui'], function ($) {
    return {
        post: function (param) {
            var index;
            $.ajax({
                type: "POST",
                url: param.url,
                data: param.data,
                dataType: "json",
                success: param.success,
                error: function () {
                    layer.close(index);
                },
                beforeSend: function () {
                    index = layer.load(4, {
                        shade: [0.1,'#000']
                    });
                },
                complete: function () {
                    layer.close(index);
                }
            });
        },
        POST: function (param) {
            $.ajax({
                type: "POST",
                url: param.url,
                data: param.data,
                dataType: param.dataType,
                success: param.success,
                error: param.error,
                beforeSend: param.beforeSend,
                complete: param.complete
            });
        },
        GET: function (param) {
            $.ajax({
                type: "GET",
                url: param.url,
                data: param.data,
                dataType: param.dataType,
                success: param.success,
                error: param.error,
                beforeSend: param.beforeSend,
                complete: param.complete
            });
        }
    }
})