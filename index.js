import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default Marionette.Behavior.extend({
    defaults: {
        methods: [],
        className: 'throttled',
    },
    isEnabled: {},
    toggleEl(method, $el, enable) {
        if (!this.view.isDestroyed) {
            this.view.triggerMethod('throttle:' + method + ':disabled');

            if ($el) {
                // Special case forms, so that if a submit is triggered
                // using for example an enter, the className is properly
                // bound.
                if ($el.is('form')) {
                    $el.find('[type="submit"]').toggleClass(this.options.className, enable).prop('disabled', enable);
                }

                $el.toggleClass(this.options.className, enable).prop('disabled', enable);
            }
        }
    },
    enable(method, $el) {
        this.isEnabled[method] = true;
        this.toggleEl(method, $el, false);
    },
    disable(method, $el) {
        this.isEnabled[method] = false;
        this.toggleEl(method, $el, true);
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

                        // Prevent default action. We don't want to submit a
                        // form for example.
                        if (e && e.preventDefault) {
                            e.preventDefault();
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
