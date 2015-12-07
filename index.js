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

            if ($el) {
                $el.removeClass(this.options.className);
                $el.prop('disabled', false);
            }
        }
    },
    disable(method, $el) {
        this.isEnabled[method] = false;

        if (!this.view.isDestroyed) {
            this.view.triggerMethod('throttle:' + method + ':disabled');

            if ($el) {
                $el.addClass(this.options.className);
                $el.prop('disabled', true);
            }
        }
    },
    initialize() {
        _.each(this.options.methods, (method) => {
            // Enable all methods.
            this.isEnabled[method] = true;

            // Wrap original method.
            this.view[method] = ((original, ...args) => {
                return (e) => {
                    if (this.isEnabled[method]) {
                        const xhr = original.apply(this.view, args);
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
