


# Surf Report Chrome Extension

## Install
```
nvm use // If you're using nvm. Otherwise ensure you're using the NodeJS version specified in the `.nvmrc file
npm install
```

## Develop
```
npm start
```

## Build
```
npm run build
```
The unpacked extension files can be found in `./dist`

## Development Resources
- https://github.com/mozilla/webextension-polyfill

## Data Acquisition
- https://github.com/swrobel/meta-surf-forecast
- https://github.com/dssd1001/surfnow#kbyg
- Use La Jolla's Surfline spot ID to test- 5842041f4e65fad6a77088cc
- [find beach spot](https://services.surfline.com/search/site?q=<SEARCH_TERM>&querySize=10&suggestionSize=10&newsSearch=false)
- [spot overview](https://services.surfline.com/kbyg/regions/overview?subregionId=<SPOT_ID>&meterRemaining=undefined)
- [taxonomy](https://services.surfline.com/taxonomy?type=taxonomy&id=<SPOT_ID>&maxDepth=1)
- [wave data](https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=<SPOT_ID>&days=16&intervalHours=6&maxHeights=true)
- [wind data](https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=<SPOT_ID>&days=6&intervalHours=1&sds=false)
- [tide data](https://services.surfline.com/kbyg/spots/forecasts/tides?spotId=<SPOT_ID>&days=6)
- [weather data](https://services.surfline.com/kbyg/spots/forecasts/weather?spotId=<SPOT_ID>&days=6&intervalHours=1&sds=false)