import * as React from 'react'
import * as Moment from 'moment'
import { parseAllowLinks, parseEmbedTitle } from '../Markdown'
import { Image, Twemoji } from '../Markdown/elements'
import {
  Root,
  ColorPill,
  Wrapper,
  Content,
  Fields,
  FieldName,
  FieldValue,
  Field,
  FooterIcon,
  Footer,
  Title,
  AuthorName,
  AuthorIcon,
  Author
} from './elements'

function parseEmojis(text) {
  if (text) {
    if (typeof text === 'string') {
      return <Twemoji text={text} />
    } else if (text instanceof Array) {
      return text.map((part, i) => {
        return part === 'string' ? (
          <Twemoji svg key={i + part} text={part} />
        ) : (
          part
        )
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

  let computed = <Title>{parseEmojis(parseEmbedTitle(title))}</Title>
  if (url) {
    computed = (
      <Title>
        <Link href={url}>{parseEmojis(parseEmbedTitle(title))}</Link>
      </Title>
    )
  }

  return computed
}

const EmbedDescription = ({ content }) => {
  if (!content) {
    return null
  }

  return (
    <div className="embed-description markup">
      {parseEmojis(parseAllowLinks(content))}
    </div>
  )
}

const EmbedAuthor = ({ name, url, icon_url }) => {
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

  const authorIcon = icon_url ? <AuthorIcon src={icon_url} /> : null

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

const EmbedThumbnail = ({ url, height, width }) => {
  if (!url) {
    return null
  }

  return <Image src={url} height={height} width={width} />
}

const EmbedImage = ({ url, height }) => {
  if (!url) {
    return null
  }

  // NOTE: for some reason it's a link in the original DOM
  // not sure if this breaks the styling, probably does
  return (
    <a className="embed-thumbnail embed-thumbnail-rich">
      <img className="image" role="presentation" src={url} />
    </a>
  )
}

const EmbedFooter = ({ timestamp, text, icon_url }) => {
  if (!text && !timestamp) {
    return null
  }

  // pass null, since undefined will make moment(...) return the current date/time
  let time: any = Moment(timestamp !== undefined ? timestamp : null)
  time = time.isValid() ? time.format('ddd MMM Do, YYYY [at] h:mm A') : null

  const footerText = [text, time].filter(Boolean).join(' | ')
  const footerIcon = text && icon_url ? <FooterIcon src={icon_url} /> : null

  return (
    <React.Fragment>
      {footerIcon}
      <Footer>{parseEmojis(footerText)}</Footer>
    </React.Fragment>
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
  footer
}) => {
  return (
    <Root>
      <ColorPill color={color} />
      <Wrapper>
        <Content>
          <EmbedAuthor {...author} />
          <EmbedTitle title={title} url={url} />
          <EmbedDescription content={description} />
          <EmbedFields fields={fields} />
          <EmbedThumbnail {...thumbnail} />
        </Content>
        <EmbedImage {...image} />
        <EmbedFooter timestamp={timestamp} {...footer} />
      </Wrapper>
    </Root>
  )
}

export default Embed
