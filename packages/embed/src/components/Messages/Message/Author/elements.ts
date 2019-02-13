import styled from 'typed-emotion'

// Root
export const Root = styled('span')`
  display: flex;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
`

// Username
interface NameProps {
  color: string
}

export const Name = styled<NameProps, 'strong'>('strong')`
  color: ${({ color }) => (color !== '#000000' ? color : null)};
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
  font-weight: 500;
  letter-spacing: 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 340px), (max-height: 370px) {
    font-size: 14px;
  }
`

// Timestamp
export const Time = styled('span')`
  color: ${({ theme }) => theme.colors._primary.fadeOut(0.8).toString()};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  margin-left: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-transform: none;

  @media (max-width: 400px), (max-height: 420px) {
    font-size: 11px;
  }

  @media (max-width: 340px), (max-height: 370px) {
    font-size: 10px;
  }

  @media (max-width: 220px) {
    display: none;
  }
`
