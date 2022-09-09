odoo.define('beanbakery_vietqr.PaymentScreen', function (require) {
    'use strict';

  
    const PaymentScreen = require('point_of_sale.PaymentScreen');
   
   
    const Registries = require('point_of_sale.Registries');
    

    const PosPayment = (_PaymentScreen) => class extends _PaymentScreen {
        constructor() {
            super(...arguments);
            this.currentOrder.set_to_invoice(true)
        }
    }
    Registries.Component.extend(PaymentScreen, PosPayment);

    //   console.log("Registries: ", Registries);
      return PaymentScreen;
})