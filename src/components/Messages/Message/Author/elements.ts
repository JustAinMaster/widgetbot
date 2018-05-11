import styled from 'typed-emotion'

// Root
export const Root = styled('span')``

// Username
interface NameProps {
  color: string
}

export const Name = styled<NameProps, 'strong'>('strong')`
  color: ${({ color }) => (color !== '#000000' ? color : null)};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  &:hover {
    text-decoration: underline;
  }
`

// Timestamp
export const Time = styled('span')`
  line-height: 21px;
  color: ${({ theme }) => theme.colors._primary.fadeOut(0.8).toString()};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0;
  margin-left: 6px;
  text-transform: none;
`
