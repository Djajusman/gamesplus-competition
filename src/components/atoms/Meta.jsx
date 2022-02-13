import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Meta = ({
  info,
  totalReward
}) => {
  const {
    meta_title,
    meta_desc, 
    meta_keyword,
    meta_img
  } = info

  const title = "RCTI+"
  const site_name_games = "Games+ on RCTI+"
  const description = "Main Game Instan HTML5 Langsung dari Aplikasi RCTI+. Menyajikan berbagai game menarik yang bisa dimainkan oleh semua umur. Satu Aplikasi Semua Hiburan. RCTI+"

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
          {/* <link rel="canonical" href={oneSegment + encodeURI().replace('trending/', 'news/')} /> */}
          <meta name="title" content={(meta_title) + ' - ' + (site_name_games)} />
          <meta name="description" content={meta_desc || description} />
          <meta name="keywords" content={meta_keyword} />
          <meta name="image" content={meta_img} />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta itemprop="name" content={(meta_title) + ' - ' + (site_name_games)} />
          <meta itemprop="description" content={meta_desc} />
          <meta itemprop="image" content={meta_img} />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="fb:app_id" content="211272363627736" />
          <meta property="og:title" content={(meta_title) + ' - ' + (site_name_games)} />
          <meta property="og:description" content={meta_desc || description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.rctiplus.com" />
          <meta property="og:image" content={meta_img} />
          <meta property="og:site_name" content="RCTI+" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:title" content={(meta_title) + ' - ' + (site_name_games)} />
          <meta name="twitter:description" content={meta_desc || description} />
          <meta name="twitter:image" content={meta_img} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@RCTIPlus" />
          <meta name="twitter:creator" content="@RCTIPlus" />
          <meta name="twitter:url" content="https://www.rctiplus.com" />
          <meta name="twitter:image:alt" content="rctiplus" />
          <meta name="twitter:domain" content="https://www.rctiplus.com" />
      </Helmet>
    </HelmetProvider>
  )
}

export default Meta
