import NextHead from 'next/head'

interface Props {
  title?: string
  description?: string
  keyword?: string
  url?: string
  image?: string
}

function OpenGraph({
  title, description, keyword, url, image,
}: Props) {
  return (
    <NextHead>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} key="title" />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} key="description" />}
      {url && <meta property="og:url" content={url} key="url" />}
      {image && <meta property="og:image" content={image} key="image" />}
      <meta name="keywords" content={keyword} />
    </NextHead>
  )
}

export default OpenGraph