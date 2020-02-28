var express = require('express');
var router = express.Router();
var ical = require('ical');
var moment = require('moment');

router.get('/', function (req, res, next) {

  // ****** UPDATE WITH YOUR DETAILS ****** //
  // let tripIcal = "https://www.tripit.com/feed/ical/...";
  // let yourName = "Morgan";
  // let googleApiKey = "yourGoogleApiKeyHere";
  // let title = "Your Website Title";
  // let subtitle = "Your Website Subtitle";
  // let subsubtitle = "Your Website Subsubtitle";
  // let website = "www.linktoyourwebsite.com";
  // let homeData = "I am not traveling!";
  // let homeAddress = "11501+Burnet+Rd+,+Austin+TX"; // Use + instead of spaces, do NOT put your actual home address

  // ^^^^^^ UPDATE WITH YOUR DETAILS ^^^^^^ //

  let travelData = '';
  var currentDate = new Date();
  // currentDate.setDate(currentDate.getDate() + 3); // for testing
  let currentTime = "Last Updated: " + moment().format('MMMM Do YYYY, h:mm:ss a');
  let travelBool = false;

  ical.fromURL(tripIcal, {}, function (err, data) {
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        var ev = data[k];

        // if currently traveling and entry contains the summary
        if (ev.description.startsWith(yourName) && (currentDate > ev.start) && (currentDate < ev.end)) {
          location = ev.location;
          latitude = ev.geo.lat;
          longitude = ev.geo.lon;
          travelData = ev.description;
          travelData = travelData.substring(0, travelData.indexOf('View'));
          imgUrl = "https://maps.googleapis.com/maps/api/staticmap?center="
          + latitude + ","
          + longitude
          + "&zoom=8&size=300x280&scale=2&maptype=roadmap"
          + "&markers=color:red|"
          + latitude + ","
          + longitude
          + "&key="
          + googleApiKey
          res.render('index', { 
            title: title,
            subtitle: subtitle,
            subsubtitle: subsubtitle,
            website: website,
            lastUpdated: currentTime,
            travelData,
            imgUrl 
          });
          travelBool = true;
        }
      }
    }

    // Use for home location when not traveling
    if (travelBool === false) {
      res.render('index', { 
        title: title,
        subtitle: subtitle,
        subsubtitle: subsubtitle,
        website: website,
        lastUpdated: currentTime,
        travelData: homeData,
        imgUrl: "https://maps.googleapis.com/maps/api/staticmap"
        + "?center=" + homeAddress
        + "&zoom=9&size=300x280&scale=2&maptype=roadmap"
        + "&key="
        + googleApiKey
      });
    }
  });
});

module.exports = router;
