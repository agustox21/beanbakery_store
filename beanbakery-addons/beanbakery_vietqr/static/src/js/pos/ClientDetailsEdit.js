odoo.define("beanbakery_vietqr.ClientDetailsEdit", function (require) {
  "use strict";

  const ClientDetailsEdit = require("point_of_sale.ClientDetailsEdit");
  const Registries = require("point_of_sale.Registries");

  /**
   * This a type of odoo javascript modules which use for extend an existing system module
   * @param {*} _ClientDetailsEdit 
   * @returns 
   */
  const PosClient = (_ClientDetailsEdit) => class extends _ClientDetailsEdit {
      constructor() {
        super(...arguments);
        this.filter_state = [];
        this.filter_city = [];
        this.filter_district = [];
        this.filter_ward = [];
        this.intFields = [...this.intFields, "district_id", "ward_id"];
        // console.log("Bean Client Edit Detail: ", this);
      }

      /**
       * Override the old function
       * @param {} event
       */
      captureChange(event) {
        if (event.target.name) {
          this.changes[event.target.name] = event.target.value;
          console.log(event.target.name, ":", event.target.value);
          this._get_data(event.target.name, event.target.value);
          this.changes['street2'] = this._set_street2_value();
          let sel = document.getElementsByName("city_id")[0]
          this.changes['city'] = sel.options[sel.selectedIndex].text
        }
      }

      /**
       * New functions
       */

      _set_street2_value() {
        if (
          (document.getElementsByName("ward_id")[0].options) &&
          (document.getElementsByName("district_id")[0].options)
        ) {
          //   set street2 value
          let street2_input = document.getElementsByName("street2")[0];
          let ward_text = document.getElementsByName("ward_id")[0].options[
            document.getElementsByName("ward_id")[0].selectedIndex
          ].text
          let district_text = document.getElementsByName("district_id")[0].options[
            document.getElementsByName("district_id")[0].selectedIndex
          ].text;
       
          street2_input.value = ((ward_text == "None") ? '':ward_text + ', ') + ((district_text =="None") ? '': district_text)
          return street2_input.value
            
        //   console.log(street2_input.value);
        }
      }

      _change_node_data(target, filter_data) {
        let target_select = document.getElementsByName(target)[0];
        let option;
        if (filter_data.length > 0 && (target_select)) {
          
        //   console.log("target filter :", filter_data);
        //   console.log("begin: ", target_select);
          target_select.innerHTML = "";
        //   console.log("with clean innerHTML", target_select);
          filter_data.forEach((element) => {
            option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.name;
            target_select.appendChild(option);
          });
        }
      }

      _get_data(target, conditions) {
        switch (target) {
          case "city_id":
            // get filter district data
            this.filter_district = this.env.pos["district"].filter(
              (e) => e["city_id"][0] == conditions
            );
            this._change_node_data("district_id", this.filter_district);
            // get filter ward data
            this.filter_ward = this.env.pos["ward"].filter(
              (e) =>
                e["district_id"][0] ==
                document.getElementsByName("district_id")[0].value
            );
            this._change_node_data("ward_id", this.filter_ward);
            break;

          case "district_id":
            this.filter_ward = this.env.pos["ward"].filter(
              (e) =>
                e["district_id"][0] ==
                document.getElementsByName("district_id")[0].value
            );
            this._change_node_data("ward_id", this.filter_ward);
            break;

          case "state_id":
            // get city filter data
            this.filter_city = this.env.pos["city"].filter(
              (e) => e["state_id"][0] == conditions
            );
            this._change_node_data("city_id", this.filter_city);
            // get filter district data
            this.filter_district = this.env.pos["district"].filter(
              (e) =>
                e["city_id"][0] == document.getElementsByName("city_id")[0].value
            );
            this._change_node_data("district_id", this.filter_district);
            // get filter ward data
            this.filter_ward = this.env.pos["ward"].filter(
              (e) =>
                e["district_id"][0] ==
                document.getElementsByName("district_id")[0].value
            );
            this._change_node_data("ward_id", this.filter_ward);
            break;

          case "country_id":
              this.filter_state = this.env.pos["states"].filter(
                (e) => e["country_id"][0] == conditions
              );
              this._change_node_data("state_id", this.filter_state);
              // get city filter data
            this.filter_city = this.env.pos["city"].filter(
                (e) => e["state_id"][0] == document.getElementsByName("state_id")[0].value
              );
              this._change_node_data("city_id", this.filter_city);
              // get filter district data
              this.filter_district = this.env.pos["district"].filter(
                (e) =>
                  e["city_id"][0] == document.getElementsByName("city_id")[0].value
              );
              this._change_node_data("district_id", this.filter_district);
              // get filter ward data
              this.filter_ward = this.env.pos["ward"].filter(
                (e) =>
                  e["district_id"][0] ==
                  document.getElementsByName("district_id")[0].value
              );
              this._change_node_data("ward_id", this.filter_ward);
            break;
          default:
            break;
        }
      }
    };

  Registries.Component.extend(ClientDetailsEdit, PosClient);

//   console.log("Registries: ", Registries);
  return ClientDetailsEdit;
});
