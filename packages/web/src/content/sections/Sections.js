import React from 'react';
import Loadable from 'react-loadable';
import SectionTypes from 'xi-core/content/sectionTypes';
import withLoadOneByOne from 'xi-core/withLoadOneByOne';
import SectionDivider from '../../common/SectionDivider';
import { LoadableProps } from '../../common/NetworkSlow';

const HeroSection = Loadable({
  loader: () => import('./HeroSection'),
  ...LoadableProps,
});

const HorizontalThumbnailListSection = Loadable({
  loader: () => import('./horizontalThumbnailListSection'),
  ...LoadableProps,
});

const CarouselSection = Loadable({
  loader: () => import('./CarouselSection'),
  ...LoadableProps,
});

const TimelineSection = Loadable({
  loader: () => import('./TimelineSection'),
  ...LoadableProps,
});

const ExpandingCarouselSection = Loadable({
  loader: () => import('./expandingCarouselSection'),
  ...LoadableProps,
});

const SignpostSection = Loadable({
  loader: () => import('./signpostSection'),
  ...LoadableProps,
});

const ContentIndexHeaderSection = Loadable({
  loader: () => import('./contentIndexHeaderSection'),
  ...LoadableProps,
});

class Sections extends React.Component {
  render() {
    const { sections = [], oneItemLoaded, hideAvatar } = this.props;

    const items = [];

    sections.forEach((section, index) => {
      const theme = section.theme.displayFormat;

      switch (theme) {
        case SectionTypes.CONTENT_INDEX_HEADER:
          items.push(<ContentIndexHeaderSection key={index} {...section} loaded={oneItemLoaded} />);
          break;
        case SectionTypes.HERO:
          items.push(
            <HeroSection
              key={index}
              {...section}
              requestId={section.externalId}
              hideAvatar={hideAvatar}
              loaded={oneItemLoaded}
            />
          );
          break;
        case SectionTypes.PORTRAITLIST:
        case SectionTypes.SECTIONLIST:
          items.push(
            <HorizontalThumbnailListSection
              key={index}
              {...section}
              hideAvatar={hideAvatar}
              loaded={oneItemLoaded}
            />
          );
          break;
        case SectionTypes.CAROUSELSECTION:
          items.push(
            <CarouselSection
              key={index}
              {...section}
              requestId={section.externalId}
              hideAvatar={hideAvatar}
              loaded={oneItemLoaded}
            />
          );
          break;
        case SectionTypes.EXPANDINGCAROUSELSECTION:
          items.push(
            <ExpandingCarouselSection
              key={index}
              {...section}
              requestId={section.externalId}
              hideAvatar={hideAvatar}
              loaded={oneItemLoaded}
            />
          );
          break;
        case SectionTypes.GALLERY:
          items.push(<TimelineSection key={index} {...section} loaded={oneItemLoaded} />);
          break;
        case SectionTypes.SIGNPOST:
          items.push(<SignpostSection key={index} {...section} loaded={oneItemLoaded} />);
          break;
        default:
          console.warn(`Section type not recognised ${theme}`);
          break;
      }

      if (index < sections.length - 1 && items.length) {
        items.push(<SectionDivider key={index + 'SD'} />);
      }
    });

    return items;
  }
}

export default withLoadOneByOne({ itemsLabel: 'sections' })(Sections);
