define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.Behavior.extend({
        defaults: {
            methods: []
        },
        isEnabled: {},
        enable: function (method) {
            this.isEnabled[method] = true;

            if (!this.view.isDestroyed) {
                this.view.triggerMethod('throttle:' + method + ':enabled');
            }
        },
        disable: function (method) {
            this.isEnabled[method] = false;

            if (!this.view.isDestroyed) {
                this.view.triggerMethod('throttle:' + method + ':disabled');
            }
        },
        initialize: function () {
            _.each(this.options.methods, function (method) {
                // Enable all methods.
                this.isEnabled[method] = true;

                // Wrap original method.
                this.view[method] = (function (original) {
                    return function () {
                        if (this.isEnabled[method]) {
                            var xhr = original.apply(this.view, arguments);

                            if (xhr && xhr.always) {
                                this.disable(method);
                                
                                xhr.always(function () {
                                    this.enable(method);
                                }.bind(this));
                            }

                            return xhr;
                        }
                    }.bind(this);
                }.bind(this)) (this.view[method]);
            }.bind(this));
        }
    });
});