import styled, { css } from '../ThemeContext'

export const Root = styled('div')`
  position: relative;
  margin-top: 5px;
  max-width: 520px;
  display: flex;
  color: hsla(0, 0%, 100%, 0.7);
`

export const Wrapper = styled('div')`
  padding: 8px 10px;
  border-radius: 0 3px 3px 0;
  position: relative;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

export const Content = styled('div')`
  width: 100%;
  display: flex;
  overflow: hidden;
  ${({ theme }) =>
    theme.embed.type === 'article'
      ? css`
          flex-direction: column;
        `
      : null};

  & > div {
    display: flex;
    flex-direction: column;
  }

  & code.inline {
    font-size: 85%;
  }
`

export const Title = styled('div')`
  color: hsla(0, 0%, 100%, 1);
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
`

export { Field, Fields, FieldName, FieldValue } from './fields'
export { ColorPill } from './colorpill'
export { Footer, FooterText, FooterIcon } from './footer'
export { Author, AuthorName, AuthorIcon } from './author'
export { Thumbnail } from './thumbnail'
export { Description } from './description'
