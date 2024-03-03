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
 
    $.get('http://localhost:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            console.log(data.status);
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    })
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
            for (const place of data) {
                    const template = `<article>
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
                ${place.description}
            </div>
            </article>`;
                    $('section.places').append(template);
            }        console.log(data);
        },
        error: function(xhr, status, error) {
            console.error(xhr, status, error);
        }
    });
    $('button').click(function() {
        const amenityIds = Object.keys(amenities);
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenityIds }),
            success: function(data) {
                $('section.places').empty();
                for (const place of data) {
                    const template = `<article>
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
                ${place.description}
            </div>
            </article>`;
                    $('section.places').append(template);
                }
                console.log(data);
            },
            error: function(xhr, status, error) {
                console.error(xhr, status, error);
            }
        });
    });
    

});
