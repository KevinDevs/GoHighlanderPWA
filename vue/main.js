		//storing locally
		const UCRLOTJSON = '{"lots": { "lot_30": { "getdatafrom": "https:\/\/streetsoncloud.com\/parking\/rest\/occupancy\/id\/547" }, "lot_32": { "getdatafrom": "https:\/\/streetsoncloud.com\/parking\/rest\/occupancy\/id\/548" }, "lot_50": { "getdatafrom": "https:\/\/streetsoncloud.com\/parking\/rest\/occupancy\/id\/495" }, "lot_6": { "getdatafrom": "https:\/\/streetsoncloud.com\/parking\/rest\/occupancy\/id\/545" }, "lot_24": { "getdatafrom": "https:\/\/streetsoncloud.com\/parking\/rest\/occupancy\/id\/544" }, "lot_26": { "getdatafrom": "https:\/\/streetsoncloud.com\/parking\/rest\/occupancy\/id\/546" }, "big_springs": { "getdatafrom": "https:\/\/streetsoncloud.com\/parking\/rest\/occupancy\/id\/543" } }}';
		const UCRParkingLotsData = JSON.parse(UCRLOTJSON);
		const UCRLotsFormat = UCRParkingLotsData.lots;
		var UCRLots = [];
		for(const key in UCRLotsFormat){
			var lotReformat = new Object();
			lotReformat.name = key;
			lotReformat.url = UCRLotsFormat[key].getdatafrom;
			UCRLots.push(lotReformat);
		}
		//const lotsOrder = ['lot_30','lot_32','lot_26','lot_6','lot_24','lot_50','big_springs'];
		var lotsData = [];
		var lotURL = [];
		var lotPermitJSON = '{ "lots": { "Big Springs 1": { "permit": "Housing", "description": "Also known as Lot 21", "color": "#89c3c6" }, "Lot 6": { "permit": "<font style=\'color: #5c99c9\'>Blue</font>", "description": "<font style=\'color: #d65a59\'>Red</font> or <font style=\'color: #5c99c9\'>Blue</font> permit holders can park up to <b>two hours, one time per day.</b> <br/><b><font style=\'color: #f2b946\'>Gold</font> permit valid after 6 PM, all day on weekends. (excludes Pay-By-Space and Reserved spaces.)</b> <br/>Could be outdated check UCR Website for precise information.", "color": "linear-gradient(to bottom right, rgb(92, 153, 201) 30%, rgb(214, 90, 89) 70%, rgb(242, 185, 70) 100%)" }, "Lot 24": { "permit": "<font style=\'color: #5c99c9\'>Blue</font>", "description": "<font style=\'color: #d65a59\'>Red</font> or <font style=\'color: #5c99c9\'>Blue</font> permit holders can park up to <b>two hours, one time per day.</b> <br/><b><font style=\'color: #f2b946\'>Gold</font> permit valid after 6 PM, all day on weekends. (excludes Pay-By-Space and Reserved spaces.)</b> <br/> Could be outdated check UCR Website for precise information.", "color": "linear-gradient(to bottom right, rgb(92, 153, 201) 30%, rgb(214, 90, 89) 70%, rgb(242, 185, 70) 100%)" }, "Lot 26": { "permit": "<font style=\'color: #f2b946\'>Gold</font>", "description": "At UCR Baseball Complex", "color": "#f2b946" }, "Lot 30": { "permit": "<font style=\'color: #f2b946\'>Gold</font>", "description": "Biggest UCR Student Parking Lot", "color": "#f2b946" }, "Lot 32": { "permit": "<font style=\'color: #f2b946\'>Gold</font>", "description": "Alternative to Lot 30", "color": "#f2b946" }, "Lot 50": { "permit": "<font style=\'color: #f2b946\'>Gold</font>", "description": "At International Village", "color": "#f2b946" } } }';
		
		const PermitData = JSON.parse(lotPermitJSON);
		const PermitLots = PermitData.lots;
		
const app = Vue.createApp({
    data() {
        return {
			  parkingLots: [],
			  
		};
    },
    methods: {
		async getData() {
			lotsData = []
			for await (const lotObj of UCRLots){
		      		const result = await $.ajax({
					    url: lotObj.url,
					    dataType: "jsonp", // jsonp
					    type: "GET",
					    async: false,
					    success: function (result) {
						    var permit = PermitLots[result.results[0].location_name].permit;
						    var description = PermitLots[result.results[0].location_name].description;
						    var color = PermitLots[result.results[0].location_name].color;
						    var locName = result.results[0].location_name;
						    var locAddr = result.results[0].location_address;
						    var locSpace = result.results[0].data[0].free_spaces;
						    var locTotalSpaces = result.results[0].data[0].total_spaces;
						    var gotLot = new Object();
						    //gotLot.name = locName.replace('-','');
						    gotLot.name = locName;
						    gotLot.description = description;
						    gotLot.color = color;
						    gotLot.permit = permit;
						    gotLot.locName = locAddr;
						    gotLot.locAddr = locAddr;
						    gotLot.locSpace = locSpace;
						    gotLot.locTotalSpaces = locTotalSpaces;
						    gotLot.key = lotObj.name;
						    lotsData.push(gotLot);
					    },
					    error: function (xhr, status, error) {
					        console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
					        document.getElementById("error").style.display=null;
					        document.getElementById("loading").style.display="none";
					    }
					});
		    }
		    //console.log(lotsData);
		    this.addData();
		    document.getElementById("loading").style.display="none";
	    },
	    addData(){
		    //this.parkingLots = [];
		    /*for(const lot of lotsOrder){
			    for(const data of lotsData){
				    if(lot == data.key){
					    if(lotsOrder.length != this.parkingLots.length){
							this.parkingLots.push(data);
					    }else{
						    for(var lotData of this.parkingLots){
							    if(lotData.key == data.key){
								    console.log( data.key + " " + lotData.key +" " +data.locSpace + " " +lotData.locSpace);
								    lotData.locSpace = data.locSpace;
							    }
						    }
					    }
				    }
			    }
		    }*/
		    for(const data of lotsData){
					    if(lotsData.length != this.parkingLots.length){
							this.parkingLots.push(data);
					    }
			    }
			    this.updateData();
	    },
	    updateData(){
		    for(var i = 0; i < this.parkingLots.length; i++){
							    //if(lotData.key == data.key){
								    //console.log( this.parkingLots[i].locSpace);
								    //console.log( lotsData[i].locSpace);
								    this.parkingLots[i].locSpace = lotsData[i].locSpace;
							    //}
						    }
	    }
    },
    mounted(){
	    this.getData();
	    //this.interval = setInterval(() => this.addData(), 1000);
	    this.interval2 = setInterval(() => this.getData(), 60000);
    }
    
})