var params = [];
var remote_url = "";
var lot_div_id = "";
var relative_path = 'https://parkingapps.ucr.edu/' + application_rel + "/modules/index/public";
var api = 'https://parkingapps.ucr.edu/' + application_rel + "/modules/index/models/api.php";
var html_string = "";

$(document).ready(function() {
    
  setInterval(() => {
    refreshBigSprings2Lot();
  }, 60000); // refresh every minute

    $.getJSON('widget_params.json', function(data) {
        params = data;
        createWidgets();
        refreshBigSprings2Lot();
    });
});

function refreshBigSprings2Lot() {
  $.ajax({
    type: 'GET',
    url: api,
    dataType: 'JSON',
    success: function (res) {
      html_string = "";
      let d = new Date();
      let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
      let minute = d.getMinutes() > 9 ? d.getMinutes() : '0'+d.getMinutes();
      let ampm = d.getHours() >= 12 ? 'pm' : 'am';
      let time = hour + ':' + minute + ' ' + ampm;

      if(!!res && res.errors == 0) {
        createHtmlStr(2, 500, res.lotName, '405 Big Springs Road', res.freeSpaces, time, Math.round(res.occupancy/res.capacity*100), 'parking-zone.jpg');
      } else {
        const noDataEl = `<span style="font-size: 22px">Data Unavailable</span>`;
        createHtmlStr(2, 500, 'Big Springs 2', '405 Big Springs Road', noDataEl, time, 0, 'parking-zone.jpg');  
      }
      $("#widget_big_springs_2").html(html_string);
    },
    fail: function () {
        console.log('Error...');
    }
  });
}

function createWidgets() {
    // Append the correct CSS file wanted. Should be either 'blue' or 'dark'.
    var css = $('<Link>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: relative_path + '/css/' + params.layout + '.css'
    });
    css.appendTo('head');

    var updateOccupancy = function() {
        $.each(params.lots, function(key, val) {
            remote_url = val.getdatafrom;
            lot_div_id = "#widget_" + key;

            $.ajax({
                type: 'GET',
                url: remote_url,
                dataType: 'jsonp',
                success: function (res) {
                    html_string = "";
                    var time = getFormattedTime(res.results[0].data, -1);
                    var default_min = params.defaultFree ? res.results[0].default_free : undefined;

                    if (params.type === 1) {
                        createHtmlStr(params.type, params.width, res.results[0].location_name, res.results[0].location_address, getFreeSpaces([res.results[0]], default_min), time, 0, params.logo);
                    } else {
                        var occupancy = 1 - getFreeSpaces([res.results[0]], default_min) / totalSpaces([res.results[0]]);
                        occupancy = occupancy >= 0 ? Math.round(occupancy * 100) : 0;
                        createHtmlStr(params.type, params.width, res.results[0].location_name, res.results[0].location_address, getFreeSpaces([res.results[0]], default_min), time, occupancy, params.logo);
                    }

                    $("#widget_" + key).html(html_string);
                },
                fail: function () {
                    createHtmlStr(params.type, params.width, 'No Data', 'No Data', 0, '--:--', 0, params.logo);
                }
            });

        });
        setTimeout(updateOccupancy, 60000);
    };
    setTimeout(updateOccupancy, 200);
}

function createHtmlStr(type, width, location_name, location_address, free_spaces, time, occupancy, logo) {
    if (type === 1){
        html_string = '\
            <div id="widget1" style="width: '+ width + 'px; min-width: 350px; margin: 25px; float: left;">\
                <div class="w1-body">\
                    <div class="w1-head">' + location_name + '</div>\
                    <div class="w1-middle">\
                        <div class="w1-address">' + location_address + '</div>\
                        <div class="w1-title">Free spaces</div>\
                        <div class="w1-places">' + free_spaces + '</div>\
                        <div class="w1-time empty-time">' + time + '</div>\
                    </div>\
                </div>\
                <div class="w1-bottom">\
                    <div class="w1-logo"><img src="' + relative_path + '/images/' + logo + '" alt="Logo" width="100" /></div>\
                </div>\
            </div>';
    } else {
        html_string = '\
            <div id="widget2" style="width: ' + width + 'px; min-width: 350px; margin: 25px; float: left;">\
                <div class="w2-body">\
                    <div class="w2-head">\
                       ' + location_name + '<div class="w2-time">' + time + '</div>\
                    </div>\
                    <div class="w1-middle">\
                        <div class="w2-address">' + location_address + '</div>\
                        <div class="w2-title">Free Spaces</div>\
                        <div class="w2-places">' + free_spaces + '</div>\
                        <div class="w2-logo"><img style="width: 100px" src="' + relative_path + '/images/' + logo + '" alt="Logo" /></div>\
                    </div>\
                </div>\
                <div class="w2-bottom">\
                    <div class="w2-bottom-title">Occupancy</div>\
                    <div class="percent">' + occupancy + '%</div>\
                    <div class="occupancy-progress">\
                        <div class="bar-free"></div>\
                        <div class="bar" style="width: ' + occupancy + '%"></div>\
                    </div>\
                </div>\
            </div>';
    }
}

function getFreeSpaces(data, min){
    var free = 0;
    for (var i=0; i < data.length; i++){
        free += parseInt(data[i].free_spaces);
    }
    if (isNaN(free)){
        free = 0;
    }

    if (min == undefined){
        return free;
    } else {
        return free > min ? free : min;
    }
}

function totalSpaces(data){
    var free = 0;
    for (var i=0; i < data.length; i++){
        free += parseInt(data[i].total_spaces);
    }

    return free ? free : 0;
}

function getFormattedTime(data, i){
    if (i === -1){
        var max = '';
        for(var j = 0; j < data.length; j++){
            time = data[j].date_time.match(/\s\d{2}:\d{2}/) ? data[j].date_time.match(/\s\d{2}:\d{2}/)[0] : '--:--';
            max = time > max ? time : max;
        }
        time = max;
    } else {
        var time = data[i].date_time.match(/\s\d{2}:\d{2}/) ? data[i].date_time.match(/\s\d{2}:\d{2}/)[0] : '--:--';
    }
    if (parseInt(time) > 12){
        time = time.replace(/\d{1,2}/, parseInt(time) % 12);
        time += ' pm';
    } else if (parseInt(time) === 12) {
        time += ' pm';
    } else if (time !== '--:--') {
        time += ' am';
    }

    return time;
}