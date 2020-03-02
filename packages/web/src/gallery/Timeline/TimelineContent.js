import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { SizeMe } from 'react-sizeme';
import { contentShape, CONTENT_TYPES } from 'xi-core/gallery/constants';
import {
  getContentTypeFromContent,
  // getVideoSrcsFromContent
} from 'xi-core/gallery/utils';
// import withVideoPlaybackSession from 'xi-core/content/withVideoPlaybackSession';
import { getSrcsetFromContent } from 'xi-core/gallery/utils';
import { ROW_HEIGHT_PX } from '../../common/dimensions';
import LoaderSpinner from '../../common/LoaderSpinner';
// import VideoJS from '../../content/components/VideoJSComponent';
import TimelineImage from './TimelineImage';

// const VideoPlayer = withVideoPlaybackSession(VideoJS);
// const PlayerContainerInner = styled.div`
//   width: 100%;
//   height: 100%;
// `;

const PlayerContainerOuter = styled.div`
  width: 100%;
  height: 100%;
  padding: ${17 * ROW_HEIGHT_PX}px 0;
  flex-grow: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimelineContentContainer = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

/**
 * Takes a piece of Gallery content and displays it as either a video or an image
 */
class TimelineContent extends React.Component {
  static propTypes = {
    content: contentShape,
    onClick: PropTypes.func,
  };

  renderContent = () => {
    const { content, onClick, width, height } = this.props;
    const contentType = getContentTypeFromContent(content);
    const sourceSet = getSrcsetFromContent(width / height, content);

    if (!content) {
      return (
        <PlayerContainerOuter>
          <LoaderSpinner />
        </PlayerContainerOuter>
      );
    }

    switch (contentType) {
      case CONTENT_TYPES.IMAGE:
        return (
          <TimelineImage
            onClick={onClick}
            src={sourceSet.src}
            srcSet={sourceSet.srcset}
            sizes={`${width}px`}
            content={content}
          />
        );
      case CONTENT_TYPES.VIDEO:
        return <PlayerContainerOuter>Video not supported</PlayerContainerOuter>;
      // reference implementation of video support if it becomes required again
      // return (
      //   <React.Fragment>
      //     <PlayerContainerOuter>
      //       <SizeMe monitorHeight={true}>
      //         {({ size }) => (
      //           <PlayerContainerInner>
      //             <VideoPlayer
      //               contentForSession={content}
      //               fluid={false}
      //               width={size.width}
      //               height={size.height}
      //               source={{
      //                 sources: getVideoSrcsFromContent(content),
      //                 poster: getSrcsetFromContent(1.77, content).src,
      //               }}
      //               autoPlay={false}
      //               bigPlayButton
      //             />
      //           </PlayerContainerInner>
      //         )}
      //       </SizeMe>
      //     </PlayerContainerOuter>
      //   </React.Fragment>
      // );
      default:
        break;
    }
  };

  render() {
    const { content, ...props } = this.props;
    return <TimelineContentContainer {...props}>{this.renderContent()}</TimelineContentContainer>;
  }
}

export default TimelineContent;
