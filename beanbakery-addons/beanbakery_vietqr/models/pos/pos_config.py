# -*- coding: utf-8 -*-

from odoo import models, fields,api


class PosConfigImage(models.Model):
    _inherit = 'pos.config'
    bank_acc = fields.Many2one(string='Bank Account', comodel_name="res.partner.bank",)
    # pos_bank_holder = fields.Char(
    #     string="Bank Holder",
    #     help="Defines the value of the POS Bank Account Holder.\n",
    # )

    # pos_bank_name = fields.Char(
    #     string="Bank Name",
    #     help="Defines the value of the Bank Name .\n",
    # )

    # pos_bank_account = fields.Char(
    #     string="Bank Account",
    #     help="Defines the value of the Bank Account.\n",
    # )
    
    @api.onchange('bank_acc')
    def _update_bank_data(self):
        print('id: ',self.bank_acc)
   
