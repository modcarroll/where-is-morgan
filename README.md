# Where is Morgan?

Node.js app that pulls trip information from TripIt .iCal feed and displays on a dashboard with a Google Maps image if you are traveling on a given day.

## Requirements

- IBM Cloud account

- [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started)

- TripIt Account (that syncs with iCal feed)

- Google Maps Static API Key

## Directions

1. Modify `manifest.yml` with your preferred app name. Note that this will be prepended to ".mybluemix.net" once you deploy to IBM Cloud and will serve as your URL.

2. In `routes/index.js` edit the following variables:

```
    tripIcal: The full link to your Tripit iCal feed. "https://www.tripit.com/feed/ical/..."

    yourName: Just your first name! Example: "Morgan"
    
    googleApiKey: Paste your Google API key here as a string
    
    title: The title you would like to display
    
    subtitle: The subtitle for the website
    
    subsubtitle: Subtitle to the subtitle
    
    website: Link to your website
    
    homeData: The string that should be displayed when you are NOT traveling such as "I am not traveling!"
    
    homeAddress: The address that you would like your map to center on when you are not traveling. Use `+` instead of `space` Example: "123+Main+St,+Austin+TX"
```

3. Run or deploy.

## Run Locally

1. `npm install`
2. `nodemon start`

## Deploy to IBM Cloud

1. `ibmcloud login`
2. `ibmcloud target --cf`
3. `ibmcloud app push`