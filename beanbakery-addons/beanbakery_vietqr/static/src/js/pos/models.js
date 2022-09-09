/** @odoo-module **/



var models = require("point_of_sale.models");
/**
 * models: [{
    model: [string] the name of the openerp model to load.
    label: [string] The label displayed during load.
    fields: [[string]|function] the list of fields to be loaded.
            Empty Array / Null loads all fields.
    order:  [[string]|function] the models will be ordered by the provided fields
    domain: [domain|function] the domain that determines what
            models need to be loaded. Null loads everything
    ids:    [[id]|function] the id list of the models that must
            be loaded. Overrides domain.
    context: [Dict|function] the openerp context for the model read
    condition: [function] do not load the models if it evaluates to
            false.
    loaded: [function(self,model)] this function is called once the
            models have been loaded, with the data as second argument
            if the function returns a deferred, the next model will
            wait until it resolves before loading.
 }]

options:
    before: [string] The model will be loaded before the named models
            (applies to both model name and label)
    after:  [string] The model will be loaded after the (last loaded)
            named model. (applies to both model name and label)models: [{
    model: [string] the name of the openerp model to load.
    label: [string] The label displayed during load.
    fields: [[string]|function] the list of fields to be loaded.
            Empty Array / Null loads all fields.
    order:  [[string]|function] the models will be ordered by the provided fields
    domain: [domain|function] the domain that determines what
            models need to be loaded. Null loads everything
    ids:    [[id]|function] the id list of the models that must
            be loaded. Overrides domain.
    context: [Dict|function] the openerp context for the model read
    condition: [function] do not load the models if it evaluates to
            false.
    loaded: [function(self,model)] this function is called once the
            models have been loaded, with the data as second argument
            if the function returns a deferred, the next model will
            wait until it resolves before loading.
 }]

options:
    before: [string] The model will be loaded before the named models
            (applies to both model name and label)
    after:  [string] The model will be loaded after the (last loaded)
            named model. (applies to both model name and label)
 */
models.load_models(
  [
    {
      model: "res.city",
      condition: function (self) {
        return true;
      },
      fields: ["name", "code", "slug","state_id","country_id","zipcode"],
      loaded: function (self, city) {
        // console.log(city);
        if (city.length) {
          // do operation as you like, here setting the value in a variable
          self.city = city
        }
      },
    },
    {
        model: "res.country.district",
        condition: function (self) {
          return true;
        },
        fields: ["name", "code", "slug","city_id","state_id","country_id","zipcode"],
        loaded: function (self, district) {
          // console.log(district);
          if (district.length) {
            // do operation as you like, here setting the value in a variable
            self.district = district
          }
        },
      },
      {
        model: "res.country.ward",
        condition: function (self) {
          return true;
        },
        fields: ["name", "code", "slug","district_id","city_id","state_id","country_id","zipcode"],
        loaded: function (self, ward) {
          // console.log(ward);
          if (ward.length) {
            // do operation as you like, here setting the value in a variable
            self.ward = ward
          }
        },
      },
  ],
  { after: "res.country.state" },
);

/**
 * 
 */
models.load_fields('res.partner',['street2','city_id','district_id','ward_id'])

