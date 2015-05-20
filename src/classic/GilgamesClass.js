"use strict";

// Thanks to https://github.com/facebook/react/blob/master/src/classic/class/ReactClass.js


var assign = require("../shared/stubs/Object.assign")
var invariant = require('../shared/vendor/core/invariant');
var keyMirror = require('../shared/vendor/key-mirror/keyMirror');
var keyOf = require('../shared/vendor/key-mirror/keyOf');

/**
 * Policies that describe methods in `GilgamesClassInterface`.
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE       : null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY       : null,
  /**
   * These methods are overriding the base class.
   */
  OVERRIDE_BASE     : null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null
});



/**
 * @interface GilgamesInterface
 * @internal
 *
 */
var GilgamesInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE
}

var GilgamesClass = {

  createClass: function (spec) {

    var Constructor = function (props, context) {
      this.props = props;
      this.context = context;
    }

    Constructor.prototype.constructor = Constructor;

    invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    for (var methodName in GilgamesInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null
      }
    }

    return Constructor;

  }
}

module.exports = GilgamesClass