'use strict'
import API_KEY from './config.js'

const ipAddressField = document.querySelector('.ipAddressField')
const timezoneInput = document.querySelector('.timezoneInput')
const countryLocationInput = document.querySelector('.locationInput')
const ispInput = document.querySelector('.ispInput')
const submitBtn = document.querySelector('.submit-btn')
const inputField = document.querySelector('.input-field')

// loccation Information
const continentCode = document.querySelector('.continent-code')
const continentName= document.querySelector('.continent-name')
const countryCode= document.querySelector('.country-code')
const countryName = document.querySelector('.country-name')
const countryCapital = document.querySelector('.country-capital')
const stateProvince = document.querySelector('.state-province')
const city = document.querySelector('.city')
const zipCode = document.querySelector('.zip-code')
const latitude = document.querySelector('.latitude')
const longitude = document.querySelector('.longitude')
const callingCode = document.querySelector('.calling-code')
const countryTld= document.querySelector('.country-tld')
const languages = document.querySelector('.languages')
const countryFlag = document.querySelector('#countryFlag')
const geonameId = document.querySelector('.geoname-id')


// Network and ISP Information
const ip = document.querySelector('.ip')
const ip_add = document.querySelector('.ip')
const hostname = document.querySelector('.hostname')
const ispName = document.querySelector('.isp')
const organization = document.querySelector('.organization')
const asn = document.querySelector('.asn')
const connectionType = document.querySelector('.connection-type')
const currencyName = document.querySelector('.currency-name')
const currencyCode = document.querySelector('.currency-code')
const currencySymbol = document.querySelector('.currency-symbol')
const timeZoneName = document.querySelector('.time-zone-name')
const timeZoneOffset = document.querySelector('.time-zone-offset')
const currentTime = document.querySelector('.current-time')
const currentTimeUnix = document.querySelector('.current-time-unix')
const isDst = document.querySelector('.is-dst')
const dstSavings = document.querySelector('.dst-savings')

//Map

let map = L.map('map', { scrollWheelZoom: false }).setView([51.505, -0.09], 10)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

//API
let ipAddress
let randomIP = ''
let timeZone
let countryLocation
let cityLocation
let postalCode
let isp
let lat
let lng

// loccation Information
let api_continentCode
let api_continentName
let api_countryCode
let api_countryName
let api_countryCapital
let api_stateProvince
let api_city
let api_zipCode
let api_latitude
let api_longitude
let api_callingCode
let api_countryTld
let api_languages
let api_countryFlag
let api_geonameId

// Network and ISP Information
let api_ip
let api_hostname
let api_organization
let api_asn
let api_connectionType
let api_currencyName
let api_currencyCode
let api_currencySymbol
let api_timeZoneName
let api_timeZoneOffset
let api_currentTime
let api_currentTimeUnix
let api_isDst
let api_dstSavings



let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}=`
fetch(url)
  .then((response) => response.json())
  .then((response) => {
    ipAddress = response.ip
    timeZone = response.time_zone.offset
    countryLocation = response.country_name
    cityLocation = response.city
    postalCode = response.zipcode
    isp = response.isp
    lat = response.latitude
    lng = response.longitude


    // location Information
    api_continentCode = response.continent_code
    api_continentName = response.continent_name
    api_countryCode = response.country_code2
    api_countryName = response.country_name
    api_countryCapital = response.country_capital
    api_stateProvince = response.state_prov
    api_city = response.city
    api_zipCode = response.zipcode
    api_callingCode = response.calling_code
    api_countryTld = response.country_tld
    api_languages = response.languages
    api_countryFlag = response.country_flag
    api_geonameId = response.geoname_id


    // Network and ISP Information
    api_hostname = response.hostname
    api_organization = response.organization
    api_asn = response.asn
    api_connectionType = response.connection_type
    api_currencyName = response.currency.name
    api_currencyCode = response.currency.code
    api_currencySymbol = response.currency.symbol
    api_timeZoneName = response.time_zone.name
    api_timeZoneOffset = response.time_zone.offset
    api_currentTime = response.time_zone.current_time
    api_currentTimeUnix = response.time_zone.current_time_unix
    api_isDst = response.time_zone.is_dst
    api_dstSavings = response.time_zone.dst_savings
    

    ipAddressField.innerHTML = ipAddress
    timezoneInput.innerHTML = ` UTC ${timeZone}`
    countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation}`
    ispInput.innerHTML = isp

    // location Information
    continentCode.innerHTML = api_continentCode
    continentName.innerHTML = api_continentName
    countryCode.innerHTML = api_countryCode
    countryName.innerHTML = api_countryName
    countryCapital.innerHTML = api_countryCapital
    stateProvince.innerHTML = api_stateProvince
    city.innerHTML = api_city
    zipCode.innerHTML = api_zipCode
    latitude.innerHTML = lat
    longitude.innerHTML = lng
    callingCode.innerHTML = api_callingCode
    countryTld.innerHTML = api_countryTld
    languages.innerHTML = api_languages
    countryFlag.src = api_countryFlag
    geonameId.innerHTML = api_geonameId

    // Network and ISP Information
    ip.innerHTML = ipAddress
    hostname.innerHTML = api_hostname
    ispName.innerHTML = isp
    organization.innerHTML = api_organization
    asn.innerHTML = api_asn
    connectionType.innerHTML = api_connectionType
    currencyName.innerHTML = api_currencyName
    currencyCode.innerHTML = api_currencyCode
    currencySymbol.innerHTML = api_currencySymbol
    timeZoneName.innerHTML = api_timeZoneName
    timeZoneOffset.innerHTML = api_timeZoneOffset
    currentTime.innerHTML = api_currentTime
    currentTimeUnix.innerHTML = api_currentTimeUnix
    isDst.innerHTML = api_isDst
    dstSavings.innerHTML = api_dstSavings

    mapLocation(lat, lng)
  }).catch(error => console.log(error))

const mapLocation = (lat, lng) => {
  var markerIcon = L.icon({
    iconUrl: 'images/icon-location.svg',

    iconSize: [46, 56], // size of the icon
    iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
  })
  map.setView([lat, lng], 17)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: false,
  }).addTo(map)

  L.marker([lat, lng], { icon: markerIcon }).addTo(map)
}


const fetchGeolocationData = (ip) => {
  fetch(`${url}${ip}`)
    .then((response) => response.json())
    .then((response) => {
      ipAddress = response.ip
      timeZone = response.time_zone.offset
      countryLocation = response.country_name
      cityLocation = response.city
      postalCode = response.zipcode
      isp = response.isp
      lat = response.latitude
      lng = response.longitude

      // location Information
      api_continentCode = response.continent_code
      api_continentName = response.continent_name
      api_countryCode = response.country_code2
      api_countryName = response.country_name
      api_countryCapital = response.country_capital
      api_stateProvince = response.state_prov
      api_city = response.city
      api_zipCode = response.zipcode
      api_callingCode = response.calling_code
      api_countryTld = response.country_tld
      api_languages = response.languages
      api_countryFlag = response.country_flag
      api_geonameId = response.geoname_id

      // Network and ISP Information
      api_hostname = response.hostname
      api_organization = response.organization
      api_asn = response.asn
      api_connectionType = response.connection_type
      api_currencyName = response.currency.name
      api_currencyCode = response.currency.code
      api_currencySymbol = response.currency.symbol
      api_timeZoneName = response.time_zone.name
      api_timeZoneOffset = response.time_zone.offset
      api_currentTime = response.time_zone.current_time
      api_currentTimeUnix = response.time_zone.current_time_unix
      api_isDst = response.time_zone.is_dst
      api_dstSavings = response.time_zone.dst_savings

      ipAddressField.innerHTML = ipAddress
      timezoneInput.innerHTML = ` UTC ${timeZone}`
      countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${postalCode}`
      ispInput.innerHTML = isp


      // location Information
      continentCode.innerHTML = api_continentCode
      continentName.innerHTML = api_continentName
      countryCode.innerHTML = api_countryCode
      countryName.innerHTML = api_countryName
      countryCapital.innerHTML = api_countryCapital
      stateProvince.innerHTML = api_stateProvince
      city.innerHTML = api_city
      zipCode.innerHTML = api_zipCode
      latitude.innerHTML = lat
      longitude.innerHTML = lng
      callingCode.innerHTML = api_callingCode
      countryTld.innerHTML = api_countryTld
      languages.innerHTML = api_languages
      countryFlag.src = api_countryFlag
      geonameId.innerHTML = api_geonameId

      // Network and ISP Information
      ip_add.innerHTML = ipAddress
      hostname.innerHTML = api_hostname
      ispName.innerHTML = isp
      organization.innerHTML = api_organization
      asn.innerHTML = api_asn
      connectionType.innerHTML = api_connectionType
      currencyName.innerHTML = api_currencyName
      currencyCode.innerHTML = api_currencyCode
      currencySymbol.innerHTML = api_currencySymbol
      timeZoneName.innerHTML = api_timeZoneName
      timeZoneOffset.innerHTML = api_timeZoneOffset
      currentTime.innerHTML = api_currentTime
      currentTimeUnix.innerHTML = api_currentTimeUnix
      isDst.innerHTML = api_isDst
      dstSavings.innerHTML = api_dstSavings

      mapLocation(lat, lng)
    })
    .catch((error) => console.log(error))
}


//Search by IP + validation
submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  if (
    inputField.value.match(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    )
  ) {
    randomIP = inputField.value
    url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}=` + randomIP
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        ipAddress = response.ip
        timeZone = response.time_zone.offset
        countryLocation = response.country_name
        cityLocation = response.city
        postalCode = response.zipcode
        isp = response.isp
        lat = response.latitude
        lng = response.longitude


        // location Information
        api_continentCode = response.continent_code
        api_continentName = response.continent_name
        api_countryCode = response.country_code2
        api_countryName = response.country_name
        api_countryCapital = response.country_capital
        api_stateProvince = response.state_prov
        api_city = response.city
        api_zipCode = response.zipcode
        api_callingCode = response.calling_code
        api_countryTld = response.country_tld
        api_languages = response.languages
        api_countryFlag = response.country_flag
        api_geonameId = response.geoname_id

        // Network and ISP Information
        api_hostname = response.hostname
        api_organization = response.organization
        api_asn = response.asn
        api_connectionType = response.connection_type
        api_currencyName = response.currency.name
        api_currencyCode = response.currency.code
        api_currencySymbol = response.currency.symbol
        api_timeZoneName = response.time_zone.name
        api_timeZoneOffset = response.time_zone.offset
        api_currentTime = response.time_zone.current_time
        api_currentTimeUnix = response.time_zone.current_time_unix
        api_isDst = response.time_zone.is_dst
        api_dstSavings = response.time_zone.dst_savings

        ipAddressField.innerHTML = ipAddress
        timezoneInput.innerHTML = ` UTC ${timeZone}`
        countryLocationInput.innerHTML = `${countryLocation}, ${cityLocation} ${postalCode}`
        ispInput.innerHTML = isp

        // location Information
        continentCode.innerHTML = api_continentCode
        continentName.innerHTML = api_continentName
        countryCode.innerHTML = api_countryCode
        countryName.innerHTML = api_countryName
        countryCapital.innerHTML = api_countryCapital
        stateProvince.innerHTML = api_stateProvince
        city.innerHTML = api_city
        zipCode.innerHTML = api_zipCode
        latitude.innerHTML = lat
        longitude.innerHTML = lng
        callingCode.innerHTML = api_callingCode
        countryTld.innerHTML = api_countryTld
        languages.innerHTML = api_languages
        countryFlag.src = api_countryFlag
        geonameId.innerHTML = api_geonameId

        // Network and ISP Information
        ip.innerHTML = ipAddress
        hostname.innerHTML = api_hostname
        ispName.innerHTML = isp
        organization.innerHTML = api_organization
        asn.innerHTML = api_asn
        connectionType.innerHTML = api_connectionType
        currencyName.innerHTML = api_currencyName
        currencyCode.innerHTML = api_currencyCode
        currencySymbol.innerHTML = api_currencySymbol
        timeZoneName.innerHTML = api_timeZoneName
        timeZoneOffset.innerHTML = api_timeZoneOffset
        currentTime.innerHTML = api_currentTime
        currentTimeUnix.innerHTML = api_currentTimeUnix
        isDst.innerHTML = api_isDst
        dstSavings.innerHTML = api_dstSavings


        mapLocation(lat, lng)
      }).catch(error => console.log(error))
  } else {
    const inputValue = inputField.value.trim()
    let cleanedUrl = inputValue.replace(/^https?:\/\//, '');
    fetch(`https://dns.google/resolve?name=${cleanedUrl}`)
    .then((response) => response.json())
    .then((data) => {
      const resolvedIP = data.Answer[0].data
      fetchGeolocationData(resolvedIP)
    })
    .catch((error) => {
      console.log(error)
      alert('Error resolving domain name to IP address!')
      return false
  })
  }
})
