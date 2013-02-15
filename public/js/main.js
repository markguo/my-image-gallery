/*
 * Bootstrap Image Gallery JS Example 2.9
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true */
/*global window, document, $ */

$(function () {
    'use strict';

    var play = function(dir){
        $.ajax({
            url: 'http://localhost:3000/home/images.json' + '?dir=' + dir,
            data: {
                format: 'json'
            },
            dataType: 'json'
        }).done(function (data) {
                var gallery = $('#gallery'),
                    url;

                $.each(data.images, function (index, image) {
                    url = "http://localhost:3000/home/get_image?image=/" + data.dir + "/" + image;
                    $('<a data-gallery="gallery"/>')
                        .prop('href',    url)
                        .prop('title', image)
                        .appendTo(gallery);
                });


             var options = $('#start-slideshow').data(),
             modal = $(options.target),
             data = modal.data('modal');
             if (data) {
                $.extend(data.options, options);
             } else {
                options = $.extend(modal.data(), options);
             }
             modal.find('.modal-slideshow').find('i')
             .removeClass('icon-play')
             .addClass('icon-pause');
             modal.modal(options);
        });
    };



    // Start slideshow button:
    $('#start-slideshow').button().click(function () {
        // Load images from server:
        $.ajax({
            url: 'http://localhost:3000/home/dirs.json',
            data: {
                format: 'json'
            },
            dataType: 'json'
        }).done(function (data) {
                var gallery = $('#gallery'),
                    url;
                $.each(data, function (index, images_dir) {
                    alert(images_dir);
                    play(images_dir);

                });
            });
    });

    // Toggle fullscreen button:
    $('#toggle-fullscreen').button().click(function () {
        var button = $(this),
            root = document.documentElement;
        if (!button.hasClass('active')) {
            $('#modal-gallery').addClass('modal-fullscreen');
            if (root.webkitRequestFullScreen) {
                root.webkitRequestFullScreen(
                    window.Element.ALLOW_KEYBOARD_INPUT
                );
            } else if (root.mozRequestFullScreen) {
                root.mozRequestFullScreen();
            }
        } else {
            $('#modal-gallery').removeClass('modal-fullscreen');
            (document.webkitCancelFullScreen ||
                document.mozCancelFullScreen ||
                $.noop).apply(document);
        }
    });




});
