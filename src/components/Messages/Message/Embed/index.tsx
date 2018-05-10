import { ThemeProvider } from 'emotion-theming'
import * as Moment from 'moment'
import * as React from 'react'

import { parseAllowLinks, parseEmbedTitle } from '../Markdown'
import { Twemoji } from '../Markdown/elements'
import {
  Author,
  AuthorIcon,
  AuthorName,
  ColorPill,
  Content,
  Description,
  Field,
  FieldName,
  Fields,
  FieldValue,
  Footer,
  FooterIcon,
  FooterText,
  Root,
  Thumbnail,
  Title,
  Wrapper,
} from './elements'

function parseEmojis(text) {
  if (text) {
    if (typeof text === 'string') {
      return <Twemoji svg text={text} />
    }
    if (text instanceof Array) {
      return text.map((part, i) => {
        if (typeof part === 'string') {
          return <Twemoji svg key={i + part} text={part} />
        }
        return part
      })
    }
  }
  return text
}

const Link = ({ children, ...props }) => {
  return (
    <a target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  )
}

const EmbedTitle = ({ title, url }) => {
  if (!title) {
    return null
  }

  return url ? (
    <Title>
      <Link href={url}>{parseEmojis(parseEmbedTitle(title))}</Link>
    </Title>
  ) : (
    <Title>{parseEmojis(parseEmbedTitle(title))}</Title>
  )
}

const EmbedDescription = ({ content }) =>
  content ? (
    <Description>{parseEmojis(parseAllowLinks(content))}</Description>
  ) : null

const EmbedAuthor = ({ name, url, iconURL }) => {
  if (!name) {
    return null
  }

  let authorName
  if (name) {
    authorName = <AuthorName>{name}</AuthorName>
    if (url) {
      authorName = (
        <AuthorName>
          <Link href={url}>{name}</Link>
        </AuthorName>
      )
    }
  }

  const authorIcon = iconURL ? <AuthorIcon src={iconURL} /> : null

  return (
    <Author>
      {authorIcon}
      {parseEmojis(authorName)}
    </Author>
  )
}

const EmbedField = ({ name, value, inline }) => {
  if (!name && !value) {
    return null
  }

  const fieldName = name ? (
    <FieldName>{parseEmojis(parseEmbedTitle(name))}</FieldName>
  ) : null
  const fieldValue = value ? (
    <FieldValue>{parseEmojis(parseAllowLinks(value))}</FieldValue>
  ) : null

  return (
    <Field inline={inline}>
      {fieldName}
      {fieldValue}
    </Field>
  )
}

const EmbedThumbnail = ({ proxyURL, height, width }) =>
  proxyURL ? <Thumbnail src={proxyURL} height={height} width={width} /> : null

const EmbedImage = ({ proxyURL, height }) =>
  proxyURL ? (
    <span>
      <Thumbnail rich src={proxyURL} />
    </span>
  ) : null

const EmbedFooter = ({ timestamp, text, proxyIconUrl }) => {
  if (!text && !timestamp) {
    return null
  }

  // pass null, since undefined will make moment(...) return the current date/time
  let time = Moment(timestamp !== undefined ? timestamp : null)

  const footerText = [
    text,
    time.isValid() ? time.calendar() : null
  ]
    .filter(Boolean)
    .join(' • ')

  const footerIcon =
    text && proxyIconUrl ? <FooterIcon src={proxyIconUrl} /> : null

  return (
    <Footer>
      {footerIcon}
      <FooterText>{parseEmojis(footerText)}</FooterText>
    </Footer>
  )
}

const EmbedFields = ({ fields }) => {
  if (!fields) {
    return null
  }

  return <Fields>{fields.map((f, i) => <EmbedField key={i} {...f} />)}</Fields>
}

const Embed = ({
  color,
  author,
  title,
  url,
  description,
  fields,
  thumbnail,
  image,
  timestamp,
  footer,
  ...embed
}) => {
  return (
    <ThemeProvider
      theme={theme => ({
        ...theme,
        embed
      })}
    >
      <Root>
        <ColorPill color={color} />
        <Wrapper>
          <Content>
            <div>
              <EmbedAuthor {...author} />
              <EmbedTitle title={title} url={url} />
              <EmbedDescription content={description} />
              <EmbedFields fields={fields} />
            </div>
            <EmbedThumbnail {...thumbnail} />
          </Content>
          <EmbedImage {...image} />
          <EmbedFooter timestamp={timestamp} {...footer} />
        </Wrapper>
      </Root>
    </ThemeProvider>
  )
}

export default Embed
