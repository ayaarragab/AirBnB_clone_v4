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
