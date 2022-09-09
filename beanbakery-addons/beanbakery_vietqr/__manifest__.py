# -*- coding: utf-8 -*-
{
    'name': "Bean Bakery VietQR - VN Bank",

    'summary': """
        This is the custom module for Bean Bakery biz.
        """,

    'description': """
        This is the custom module for Bean Bakery biz, including:
            - VN address pre-defined (csv file)
            - Show customer phone and delivery address on sale order
            - 
        
        The master data (.csv file) note:
            - for the 'id' column always use alias ID, the system will automatically assign the real ID.
            - For the relation field, always use the alias ID
    """,

    'author': "Bean Bakery",
    'license':"LGPL-3",
    'website': "http://www.beanbakery.vn",
    'category': 'Appication',
    'version': '0.1',
    "application": True,
    "installable": True,

    # any module necessary for this one to work correctly
    'depends': ['base','website','mail','sale','beanbakery_address','l10n_vn','point_of_sale'],

    "images": ["static/description/icon.png"],

    # always loaded
    'data': [
        'data/res.bank.csv',
        'views/bank/bank.xml',
        'views/bank/res_bank_account.xml',
        'views/sale_order/sale_order.xml',
        'views/pos/pos_config.xml',
        'views/invoiceQR/invoice_template.xml',
        'reports/invoice.xml',
        'reports/sale_receipt.xml',
        'reports/invoice_receipt.xml',
        'security/ir.model.access.csv',
       
        
    ],
    'assets': {
        'web.report_assets_common':[
            "beanbakery_vietqr/reports/report.scss"
        ],
        'web.assets_backend': [
            "beanbakery_vietqr/static/src/js/widget/**/*",
        ],
        'point_of_sale.assets': [
            "beanbakery_vietqr/static/src/js/pos/**/*",
            "beanbakery_vietqr/static/src/scss/pos.scss",
        ],
        'web.assets_qweb': [
            'beanbakery_vietqr/static/src/xml/**/*',
        ],
    },
    
}
