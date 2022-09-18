
# -*- coding: utf-8 -*-
# from operator import le

# from webbrowser import get

from odoo import models, fields, api
from .. import vietqr
class AccountMove(models.Model):
    _inherit = "account.move"
    qr_code_url = fields.Char(string="QR code", compute="gen_vietqr")
    
    """Gen_vietqr function.
    
       This function is used for generating the VietQR image
    """
    @api.depends('amount_residual','partner_bank_id')
    def gen_vietqr(self):
       
        if self.qr_code_url != '':
                self.qr_code_url = vietqr.gen_vietqr_url(
                    acc_bic=self.partner_bank_id.bank_id.bic,
                    acc_no=self.partner_bank_id.acc_number,
                    acc_holder_name=self.partner_bank_id.acc_holder_name, 
                    bill_value= str(int(self.amount_residual)),
                    bill_detail="Pay bill %s " % (str(self.name)),
                    is_bank_acc= ("9704" not in self.partner_bank_id.acc_number)
                )
        
    