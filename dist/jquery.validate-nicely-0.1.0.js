/*
 *  Validate Nicely - v0.1.0
 *  Yet another jQuery form validator.
 *  http://[REPO].com
 *
 *  Made by Jean Pérez
 *  Under MIT License
 */
;(function ($, window, document, undefined) {

    // Create the defaults once
    var validateNicely = "validateNicely",
        defaults = {
            errorClass: "error"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.form = element;
        // TODO move elements to an object
        this.submitButtons = $($(this.form).find("*[data-submit]"));
        this.requiredFields = $($(this.form).find("*[data-required]"));
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = validateNicely;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        utils: {
            isEmpty: function (e) {
                return $.trim(e.val()) === "";
            }
        },
        init: function () {
            this.disableSubmitButtons();
            this.addOrRemoveInputErrors();

        },
        disableSubmitButtons: function () {
            this.submitButtons.bind("click", bindSubmitClick);
            function bindSubmitClick() {
                return false;
            }
        },
        addOrRemoveInputErrors: function () {
            this.requiredFields.bind("blur", addOrRemoveErrorClass);
            var errorClass = this.settings.errorClass;

            function addOrRemoveErrorClass(e) {
                var element = $(e.target);
                if (Plugin.prototype.utils.isEmpty(element))
                    element.addClass(errorClass);
                else
                    element.removeClass(errorClass);
            }
        }
    });
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ validateNicely ] = function (options) {

        this.each(function () {
            if (!$.data(this, "plugin_" + validateNicely)) {
                if (!$.data(this, "original_form")) {
                    originalHtmlForm = $("<div />").append($(this).eq(0).clone()).html();
                    $.data(this, "original_html_form", originalHtmlForm);
                }
                $.data(this, "plugin_" + validateNicely, new Plugin(this, options));
            }
        });

        this.destroy = function () {
            this.each(function () {
                $(this).replaceWith($.data(this, "original_html_form"));
            });
        };

        return this;
    };

})(jQuery, window, document);
