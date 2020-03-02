import styled from 'styled-components';
import { HelperDevices } from './dimensions';

export default styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%203%203%22%3E%3Cstyle%3E%40keyframes%20Circle1%7B0%25%7Bstroke-dasharray%3A0%200%200%206.28%7D40%25%7Bstroke-dasharray%3A0%201.57%203.14%201.57%7D80%25%2Cto%7Bstroke-dasharray%3A0%206.28%200%200%7D%7D%40keyframes%20Circle2%7B0%25%2C29%25%7Bstroke-dasharray%3A0%200%200%206.28%7D30%25%7Bstroke-dasharray%3A0%200%20.2%206.28%7D80%25%2Cto%7Bstroke-dasharray%3A0%206.28%20.2%200%7D%7D%40keyframes%20Circle3%7B0%25%2C49%25%7Bstroke-dasharray%3A0%200%200%206.28%7D50%25%7Bstroke-dasharray%3A0%200%20.2%206.28%7D80%25%2Cto%7Bstroke-dasharray%3A0%206.28%20.2%200%7D%7D%3C%2Fstyle%3E%3Cdefs%3E%3Ccircle%20id%3D%22circle%22%20cx%3D%221.5%22%20cy%3D%221.5%22%20shapeRendering%3D%22geometricPrecision%22%20r%3D%221%22%20fill%3D%22none%22%20stroke%3D%22%237C52F6%22%20stroke-width%3D%22.2%22%20transform%3D%22rotate(-90%201.5%201.5)%22%2F%3E%3C%2Fdefs%3E%3Cuse%20xlink%3Ahref%3D%22%23circle%22%20style%3D%22animation%3ACircle1%202s%20linear%20infinite%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23circle%22%20style%3D%22animation%3ACircle2%202s%20ease-in%20infinite%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23circle%22%20style%3D%22animation%3ACircle3%202s%20ease-in%20infinite%22%2F%3E%3C%2Fsvg%3E')
    center / 120px 120px no-repeat;
  width: 120px;
  height: 120px;
  margin: -60px 0 0 -60px;

  @media ${HelperDevices.belowMedium} {
    background-size: 100px 100px;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
  }
`;
