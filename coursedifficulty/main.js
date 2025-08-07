const app = Vue.createApp({
    data() {
        return {
	        searchQuery: null,
			courses: [],
			courseData: [],
		};
    },
    methods: {
		getData() {
			var sf = "https://docs.google.com/spreadsheets/d/1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/gviz/tq?tqx=out:json";
			$.ajax({url: sf, type: 'GET', dataType: 'text'})
			.done(function(data) {
			  const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
			  if (r && r.length == 2) {
			    const obj = JSON.parse(r[1]);
			    const table = obj.table;
			    const header = table.cols.map(({label}) => label);
			    const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : "")); // Modified from const rows = table.rows.map(({c}) => c.map(({v}) => v));
			    var lastCourse;
			    for(var row of rows){
				    row[4] = eval("mountedApp.d"+row[4]);
				    if(row[0]){
					    lastCourse = row[0];
					    mountedApp.courses.push(row);
				    }else{
					    //row[0] = lastCourse;
					    if(!mountedApp.courseData[lastCourse]){
						    mountedApp.courseData[lastCourse] = [];
					    }
					    mountedApp.courseData[lastCourse].push(row);
				    }
			    }
			  }
			})
			.fail((e) => console.log(e.status));
	    },
	    clearInput() {
		    this.searchQuery = "";
	    },
	    dDate(a,b,c){
		    return a+'/'+b+'/'+c;
		}
    },
    mounted(){
	    this.getData();
    },
   computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.courses.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item[0].toLowerCase().includes(v))
      })
      }else{
        return this.courses;
      }
    }
  }
    
})