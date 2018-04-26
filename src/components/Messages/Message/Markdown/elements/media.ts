import styled, { css } from 'typed-emotion'

enum Max {
  height = 300,
  width = 400
}

interface ImageProps {
  height: number
  width: number
}

/**
 * Scales an image to a selected max values
 */
const scale = (Image: ImageProps) => {
  if (Image.width && Image.height) {
    const ratio =
      Image.height < Image.width ? ['width', 'height'] : ['height', 'width']

    const factor =
      Image[ratio[0]] > Max[ratio[0]]
        ? ratio[0]
        : Image[ratio[1]] > Max[ratio[1]]
          ? ratio[1]
          : null

    const scale = factor ? Max[factor] / Image[factor] : 1

    return css`
      width: ${Image.width * scale}px;
      height: ${Image.height * scale}px;
    `
  }
  return null
}

export const Image = styled<ImageProps, 'img'>('img')`
  display: block;
  margin: 10px 0;
  cursor: zoom-in;
  border-radius: 3px;
  ${scale};

  @media (max-width: 600px) {
    width: calc(80%);
    height: auto;
  }
`
