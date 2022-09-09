odoo.define("beanbakery_vietqr.Chrome", function (require) {
  "use strict";

  const Chrome = require("point_of_sale.Chrome");
  const Registries = require("point_of_sale.Registries");

  /**
   * This a type of odoo javascript modules which use for extend an existing system module
   * @param {*} _Chrome
   * @returns
   */
  const BeanChrome = (_Chrome) =>
    class extends _Chrome {
      constructor() {
        super(...arguments);
        // console.log("Chrome: ", this);
      }
    };

  Registries.Component.extend(Chrome, BeanChrome);

  return Chrome;
});
