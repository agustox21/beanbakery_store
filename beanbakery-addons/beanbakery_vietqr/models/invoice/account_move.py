from odoo import models, fields, api
from .. import vietqr
class AccountMove(models.Model):
    _inherit = "account.move"
    qr_code_url = fields.Char(string="QR code", compute="gen_vietqr")
    
    """Gen_vietqr function.
    
       This function is used for generating the VietQR image
    """
    @api.depends('amount_residual')
    def gen_vietqr(self):
        if self.qr_code_url != '':
            self.qr_code_url = vietqr.gen_vietqr_url( bill_value= str(int(self.amount_residual)),bill_detail="Thanh toán bill %s cho BEAN Bakery " % (str(self.name)))
        
    