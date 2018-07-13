import styled from 'typed-emotion'

interface IMessage {
  length: number
}
export const Message = styled('div')<IMessage>`
  font-size: ${({ length }) =>
    length > 800
      ? 9
      : length > 600
        ? 12
        : length > 500
          ? 13
          : length > 200
            ? 15
            : 16}px;
  font-weight: 400;
  margin-top: 11px;
  text-align: center;
  color: rgba(255, 149, 149, 0.64);
`
