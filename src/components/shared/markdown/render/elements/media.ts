import ExpandableImage from 'shared/ExpandableImage'
import { Scale } from 'shared/ScaledImage'
import styled from 'typed-emotion'

interface ImageProps {
  height: number
  width: number
}

export const Image = styled(ExpandableImage)<ImageProps>`
  display: block;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 3px;
  ${props =>
    new Scale({
      height: props.height,
      width: props.width,
      maxWidth: 400,
      maxHeight: 300
    }).css};

  @media (max-width: 700px) {
    width: 65%;
    height: auto;
  }

  @media (max-width: 650px) {
    width: 70%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`
