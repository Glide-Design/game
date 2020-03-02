import React from 'react';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import { Grey85 } from 'xi-core/colours';
import { CoreDevices } from '../common/dimensions';
import BackButton from '../common/BackButton';
import FixedToolbar from './FixedToolbar';

const FIXED_BACKGROUND_THRESHOLD_PX = 80;

const StyledFixedToolbar = styled(FixedToolbar)`
  position: fixed;
  left: 0;
  right: 0;
  background: ${({ fixed }) => (fixed ? Grey85 : 'none')};
  transition: background 500ms ease;
  svg {
    fill: currentColor;
  }

  @media ${CoreDevices.large} {
    display: none;
  }

  ${props => (props.foreColor ? `color: ${props.foreColor};` : '')}
  ${props => (props.backgroundColor ? `background: ${props.backgroundColor};` : '')}
`;

class FixedToolbarOnScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedBackground: false,
    };
    this.listenerUpdateScroll = throttle(this.updateScroll, 50).bind(this);
  }

  updateScroll = () => {
    const { fixedTopBackground = FIXED_BACKGROUND_THRESHOLD_PX } = this.props;

    let scrollTop = 0;

    if (this.target) {
      scrollTop = this.target.scrollTop;
    } else {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }

    this.setState({
      fixedBackground: scrollTop >= fixedTopBackground, // if below the threshold make it stick
    });
  };

  componentDidMount() {
    this.updateScroll();
    window.addEventListener('scroll', this.listenerUpdateScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenerUpdateScroll, true);
  }

  render() {
    const { className, children, title, hideBackButton, foreColor, backgroundColor } = this.props;
    const { fixedBackground } = this.state;

    return (
      <StyledFixedToolbar
        className={className}
        fixed={fixedBackground}
        leftButton={!hideBackButton ? <BackButton /> : null}
        title={fixedBackground && title ? title : null}
        foreColor={foreColor}
        backgroundColor={backgroundColor}
      >
        {children}
      </StyledFixedToolbar>
    );
  }
}

export default FixedToolbarOnScroll;
