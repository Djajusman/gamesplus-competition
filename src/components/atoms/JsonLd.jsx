import React from 'react'

const JsonLd = ({ info }) => {

  console.info('jsonLdInfo: ', info)
  const {
    name,
    metaImg,
    metaDesc,
    imgUrl,
    endDate,
    startDate,
    totalReward
  } = info

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "startDate": startDate,
    "endDate": endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": "{url_detail_games}"
      },
    "image": [
      metaImg,
      imgUrl
      ], 
    "description": metaDesc,
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "price": totalReward, 
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock", /*#InStock yang menandakan kalau kompetisi masih bisa diikuti*/
      "validFrom": startDate
    },
    "performer": {
      "@type": "Person",
      "name": name
    },
    "organizer": {
      "@type": "Organization",
      "name": "RCTI+", 
      "url": "http://rctiplus.com"
    }
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(ldJson)}
    </script>
  )
}

export default JsonLd
