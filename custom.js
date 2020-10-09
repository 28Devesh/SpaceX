$(document).ready(function() {
    filter_data();
    var $radios_year = $('input[name=year]').change(function() {
        var year = $radios_year.filter(':checked').val();
        var succ_launch = $("input[name='succ_launch']:checked").val();
        var succ_land = $("input[name='succ_land']:checked").val();
        filter_data(year, succ_launch, succ_land);
    });

    var $radios_succ_launch = $('input[name=succ_launch]').change(function() {
        var succ_launch = $radios_succ_launch.filter(':checked').val();
        var year = $("input[name='year']:checked").val();
        var succ_land = $("input[name='succ_land']:checked").val();
        filter_data(year, succ_launch, succ_land);
    });

    var $radios_succ_land = $('input[name=succ_land]').change(function() {
        var succ_land = $radios_succ_land.filter(':checked').val();
        var year = $("input[name='year']:checked").val();
        var succ_launch = $("input[name='succ_launch']:checked").val();
        filter_data(year, succ_launch, succ_land);
    });
});

function filter_data(year = '', s_lauch = '', s_land = '') {
    url = 'https://api.spaceXdata.com/v3/launches?limit=100';
    if (year != '') {
        url += '&launch_year=' + year;
    }
    if (s_lauch != '') {
        url += '&launch_success=' + s_lauch;
    }
    if (s_land != '') {
        url += '&land_success=' + s_land;
    }

    var response_data = "";
    $('#loader').css("display", "block");
    $('#span_id').css("opacity", 0.1);

    $.ajax({
        type: "GET",
        url: url,
        success: function(response) {
            var i;
            if (response.length > 0) {
                for (i = 0; i < response.length; i++) {
                    var data = response[i]['links']['mission_patch_small'];
                    var image_data = (data != null) ? data : 'spacex-logo.png';
                    var suc_land = response[i]['rocket']['first_stage']['cores'][0]['land_success'];
                    var succ_land_data = (suc_land != null) ? suc_land : 'N/A';

                    response_data += "<div class='col-sm-2 content-main-div'>";
                    response_data += "<img src='" + image_data + "' class='image'>";
                    response_data += "<div style='margin-top: 5px;'>";
                    response_data += "<a href=''><strong>" + response[i]['mission_name'] + " #" + response[i]['flight_number'] + "</strong></a>";
                    response_data += "<div style='margin-top: 5px;'>";
                    response_data += "<label>Mission Ids:</label>";
                    response_data += "<ul>";
                    response_data += getList(response[i]['mission_id']);
                    response_data += "</ul>";
                    response_data += "<label>Launch Year:</label><a href='#'>" + response[i]['launch_year'] + "</a>"
                    response_data += "<label>Successful Launch:</label><a href='#'>" + response[i]['launch_success'] + "</a>";
                    response_data += "<label>Successful Landing:</label><a href='#'>" + succ_land_data + "</a>"
                    response_data += "</div>";
                    response_data += "</div>";
                    response_data += "</div>";
                }
            } else {
                response_data += "<div class='text-center'><strong>No Data Found!</strong></div>";
            }
            $("span").html(response_data);
            $('#loader').css("display", "none");
            $('#span_id').css("opacity", 1);
        }
    });
}

function getList(data) {
    var list_data = "";
    var i;
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            list_data += "<li><a href='#'>" + data[i] + "</a></li>";
        }
    } else {
        list_data += "<li><a href='#'>N/A</a></li>";
    }
    return list_data;
}