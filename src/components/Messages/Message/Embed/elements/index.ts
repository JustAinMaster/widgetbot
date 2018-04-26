import styled, { css } from 'typed-emotion'

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
  background-color: rgba(46, 48, 54, 0.3);
  border: 1px solid hsla(0, 0%, 80%, 0.3);
  border-color: rgba(46, 48, 54, 0.6);
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`

export const Title = styled('div')`
  color: hsla(0, 0%, 100%, 1);
  display: inline-block;
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px;
`

export { Field, Fields, FieldName, FieldValue } from './fields'
export { ColorPill } from './colorpill'
export { Footer, FooterIcon } from './footer'
export { Author, AuthorName, AuthorIcon } from './author'
