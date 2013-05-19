/*! http://tinynav.viljamis.com v1.1 by @viljamis */
/* Altered by Patrick Ward - Added optgroup support */
(function ($, window, i) {
  $.fn.tinyNav = function (options) {

    // Default settings
    var settings = $.extend({
      'active' : 'selected', // String: Set the "active" class
      'header' : 'Menu', // String: Specify text for "header" and show header instead of the active item
      'label'  : '', // String: sets the <label> text for the <select> (if not set, no label will be added)
      'optgroup' : true // enable optgroups for
    }, options);

    return this.each(function () {

      // Used for namespacing
      i++;

      var $nav = $(this),
        // Namespacing
        namespace = 'tinynav',
        namespace_i = namespace + i,
        l_namespace_i = '.l_' + namespace_i,
        $select = $('<select/>').attr("id", namespace_i).addClass(namespace + ' ' + namespace_i);

      if ($nav.is('ul,ol')) {

        if (settings.header !== '') {
          $select.append(
            $('<option/>').text(settings.header)
          );
        }

        // Build options
        var options = '';
        var optgroup = false;

        $nav
          .addClass('l_' + namespace_i)
          .find('a')
          .each(function () {

            var addOption = true;
            if ( $(this).parents('ul,ol').length - 1 <= 0) {
              if (optgroup) {
                options += '</optgroup>';
                optgroup = false;
              }
              if (  $(this).attr('href') === '#' ) {
                options += '<optgroup label="'+$(this).text()+'">';
                optgroup = true;
                addOption = false;
              }
            }
            if (addOption) {
              options += '<option value="' + $(this).attr('href') + '">';
              // var j;
              // for (j = 0; j < $(this).parents('ul, ol').length - 1; j++) {
              //   options += '- ';
              // }
              options += $(this).text() + '</option>';
            }

          });

          if (optgroup) {
            options += '</optgroup>';
          }

        // Append options into a select
        $select.append(options);

        // Select the active item
        if (!settings.header) {
          $select
            .find(':eq(' + $(l_namespace_i + ' li')
            .index($(l_namespace_i + ' li.' + settings.active)) + ')')
            .attr('selected', true);
        }

        // Change window location
        $select.change(function () {
          window.location.href = $(this).val();
        });

        // Inject select
        $(l_namespace_i).after($select);

        // Inject label
        if (settings.label) {
          $select.before(
            $("<label/>")
              .attr("for", namespace_i)
              .addClass(namespace + '_label ' + namespace_i + '_label')
              .append(settings.label)
          );
        }

      }

    });

  };
})(jQuery, this, 0);
;(function ($, window) {

  $(function() {

    $('#menu').tinyNav();

  });

})(jQuery, this);
