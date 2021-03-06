sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast', 'sap/m/Dialog', 'sap/m/Button', 'sap/m/MessageBox',],
	function (Controller, JSONModel, MessageToast, Dialog, Button, MessageBox) {
		"use strict";

		var TCController = Controller.extend("sap.m.sample.TabContainer.TabContainer", {
			onInit: function () {
				var oModel = new JSONModel();
				oModel.setData({
					employees: [
						{
							name: "Jean Doe",
							empFirstName: "Jean",
							empLastName: "Doe",
							salary: 1455.22
						},
						{
							name: "John Smith",
							empFirstName: "John",
							empLastName: "Smith",
							salary: 1390.77,
							modified: true
						},
						{
							name: "Particia Clark",
							empFirstName: "Particia",
							empLastName: "Clark",
							salary: 1189.00
						},
						{
							name: "Tim McAfeed",
							empFirstName: "Tim",
							empLastName: "McAfeed",
							salary: 1235.37
						}
					]
				});
				this.getView().setModel(oModel);
			},
			onItemSelected: function(oEvent) {
				var oItem = oEvent.getSource();
				MessageToast.show(
					'Item ' + oItem.getName() + " was selected"
				);
			},
			addNewButtonPressHandler : function(oEvent) {
				var newEmployee = new sap.m.TabContainerItem({
					name: "New employee",
					modified: false
				});

				var tabContainer = this.getView().byId("myTabContainer");

				tabContainer.addItem(
					newEmployee
				);
				tabContainer.setSelectedItem(
					newEmployee
				);
			},

			itemCloseHandler: function(oEvent) {
				// prevent the tab being closed by default
				oEvent.preventDefault();

				var oTabContainer = this.getView().byId("myTabContainer");
				var oItemToClose = oEvent.getParameter('item');

				sap.m.MessageBox.confirm("Do you want to close the tab '" + oItemToClose.getName() + "'?", {
					onClose: function (oAction) {
						if (oAction === sap.m.MessageBox.Action.OK) {
							oTabContainer.removeItem(oItemToClose);
							sap.m.MessageToast.show("Item closed: " + oItemToClose.getName(), {duration: 500});
						} else {
							sap.m.MessageToast.show("Item close canceled: " + oItemToClose.getName(), {duration: 500});
						}
					}
				});
			}
		});
		return TCController;
	});
