const app = Vue.createApp({
    data() {
        return {
			locations: [],
			categories: [],
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
					    //push loc
					    mountedApp.locations.push(row);
					    //push cate
					    if(mountedApp.categories.indexOf(row[1]) === -1) {
						    mountedApp.categories.push(row[1]);
						}
						
				    }
			    }
			  }
			})
			.fail((e) => console.log(e.status));
	    }
    },
    mounted(){
	    this.getData();
    },
    updated(){
	    $('.locations').selectpicker();
	    $('.origin').selectpicker();
	    $('.categories').selectpicker();
	    document.getElementById("loading").style.display="none";
	    document.getElementById("menuBar").style.display=null;
    }
    
})