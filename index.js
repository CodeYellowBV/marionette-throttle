import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default Marionette.Behavior.extend({
    defaults: {
        methods: [],
        className: 'throttled',
    },
    isEnabled: {},
    enable(method, $el) {
        this.isEnabled[method] = true;

        if (!this.view.isDestroyed) {
            this.view.triggerMethod('throttle:' + method + ':enabled');

            if ($el && $el.removeClass) {
                $el.removeClass(this.options.className);

                if ($el && $el.addClass) {
                    $el.addClass(this.options.className);
                }
            }
        }
    },
    disable(method, $el) {
        this.isEnabled[method] = false;

        if (!this.view.isDestroyed) {
            this.view.triggerMethod('throttle:' + method + ':disabled');

            if ($el && $el.addClass) {
                $el.removeClass(this.options.className);
            }
        }
    },
    initialize() {
        _.each(this.options.methods, (method) => {
            // Enable all methods.
            this.isEnabled[method] = true;

            // Wrap original method.
            this.view[method] = ((original) => {
                return (e) => {
                    if (this.isEnabled[method]) {
                        const xhr = original.apply(this.view, arguments);
                        let $el = null;

                        if (e && e.currentTarget) {
                            $el = this.view.$(e.currentTarget);
                        }

                        if (xhr && xhr.always) {
                            this.disable(method, $el);

                            xhr.always(() => {
                                this.enable(method, $el);
                            });
                        }

                        return xhr;
                    }
                };
            })(this.view[method]);
        });
    },
});
