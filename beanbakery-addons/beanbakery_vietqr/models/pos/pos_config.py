# -*- coding: utf-8 -*-

from odoo import models, fields,api


class PosConfigImage(models.Model):
    _inherit = 'pos.config'
    bank_acc = fields.Many2one(string='Bank Account', comodel_name="res.partner.bank",)

    
    @api.onchange('bank_acc')
    def _update_bank_data(self):
        print('id: ',self.bank_acc)
   
