const app = Vue.createApp({
    data() {
        return {
	        searchQuery: null,
			locations: [],
		};
    },
    methods: {
		getData() {
			var sf = "https://docs.google.com/spreadsheets/d/1s0G7YPaCTQvvHEzg0eeMXcgoa292pzLw80hl531S_U4/gviz/tq?tqx=out:json";
			$.ajax({url: sf, type: 'GET', dataType: 'text'})
			.done(function(data) {
			  const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
			  if (r && r.length == 2) {
			    const obj = JSON.parse(r[1]);
			    const table = obj.table;
			    const header = table.cols.map(({label}) => label);
			    const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : "")); // Modified from const rows = table.rows.map(({c}) => c.map(({v}) => v));
			    for(var row of rows){
				    if(row[0]){
					    //console.log(row[2]);
					    let coords = row[2];
					    coords = coords.split(',');
					    coords = coords.reverse();
					    coords = coords.join();
					    row[100] = coords;
					    row[100] = row[100].replaceAll(/\s/g,'');
					    //name+short
					    row[99] = row[0] + ' ' + row[8];
					    
					    //separate coords
					    var lotCoords = row[2].replaceAll(/\s/g,'');
					    lotCoords = lotCoords.split(',');
					    //location calculator
					    row['lot30'] = Math.round(mountedApp.distance(lotCoords[0], lotCoords[1], 33.9691596639425, -117.33278786975183, 'M') * 100) / 100;
					    
					    row['lot26'] = Math.round(mountedApp.distance(lotCoords[0], lotCoords[1], 33.98161615596479, -117.33490839664547, 'M') * 100) / 100;
					    
					    row['lot9'] = Math.round(mountedApp.distance(lotCoords[0], lotCoords[1], 33.97119691261777, -117.32317218611817, 'M') * 100) / 100;

						row['lot1'] = Math.round(mountedApp.distance(lotCoords[0], lotCoords[1], 33.974123733087566, -117.33239654732539, 'M') * 100) / 100;
						
						row['lot13'] = Math.round(mountedApp.distance(lotCoords[0], lotCoords[1], 33.97491414890982, -117.32049454326845, 'M') * 100) / 100;
						
					    //console.log(coords);
					    mountedApp.locations.push(row);
				    }
			    }
			  }
			})
			.fail((e) => console.log(e.status));
	    },
	    clearInput() {
		    this.searchQuery = "";
	    },
	    distance(lat1, lon1, lat2, lon2, unit) {
		    if ((lat1 == lat2) && (lon1 == lon2)) {
		        return 0;
		    }
		    else {
		        var radlat1 = Math.PI * lat1/180;
		        var radlat2 = Math.PI * lat2/180;
		        var theta = lon1-lon2;
		        var radtheta = Math.PI * theta/180;
		        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		        if (dist > 1) {
		            dist = 1;
		        }
		        dist = Math.acos(dist);
		        dist = dist * 180/Math.PI;
		        dist = dist * 60 * 1.1515;
		        if (unit=="K") { dist = dist * 1.609344 }
		        if (unit=="N") { dist = dist * 0.8684 }
		        return dist;
		    }
		}
    },
    mounted(){
	    this.getData();
    },
   computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.locations.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item[99].toLowerCase().includes(v))
      })
      }else{
        return this.locations;
      }
    }
  }
    
})