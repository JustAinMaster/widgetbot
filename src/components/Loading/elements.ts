import styled, { keyframes } from 'typed-emotion'

export const Root = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`

const cube = keyframes`
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
  }
`

export const Spinner = styled('div')`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &::after,
  &::before {
    content: '';
    background-color: #7289DA;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${cube} 1.8s infinite ease-in-out;
  }
  &::after {
    animation-delay: -0.9s;
  }
`
