$(document).ready(function() {
    const amenities = {};
 
    $('input[type="checkbox"]').change(function() {
       const amenityId = $(this).attr('data-id');
       const amenityName = $(this).attr('data-name');
 
       if ($(this).is(':checked')) {
          amenities[amenityId] = amenityName;
       } else {
          delete amenities[amenityId];
       }
 
       const amenitiesList = Object.values(amenities);
       $('div.Amenities h4').text(amenitiesList);
    });
 });
$.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
        console.log(data.status);
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
    
}) 
