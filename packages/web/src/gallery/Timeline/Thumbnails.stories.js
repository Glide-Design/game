import React from 'react';
import styled from 'styled-components';
import { fill } from 'lodash/fp';
import { SizeMe } from 'react-sizeme';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import thumbnail from 'xi-core/gallery/fixtures/thumbnail.jpeg';
import DragScrollList from './DragScrollList';
import DragScrollController from './DragScrollController';
import Thumbnail, { THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT } from './Thumbnail';

const CenterMarker = styled.div`
  position: relative;
  background: #88b7d5;
  border: 4px solid #c2e1f5;

  &:after,
  &:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #88b7d5;
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-color: rgba(194, 225, 245, 0);
    border-top-color: #c2e1f5;
    border-width: 16px;
    margin-left: -16px;
  }
`;

const bg = backgrounds([{ name: 'Dark Background', value: '#000', default: true }]);

const thumbnails = fill(0, 50, { src: thumbnail }, Array(50));

storiesOf('Thumbnails', module)
  .addDecorator(bg)
  .add('Normal use', () => (
    <SizeMe>
      {({ size }) => (
        <DragScrollController itemWidth={THUMBNAIL_WIDTH} itemCount={thumbnails.length}>
          {({ cursor, eventHandlers }) => (
            <CenterMarker {...eventHandlers}>
              <DragScrollList
                style={{ height: THUMBNAIL_HEIGHT }}
                width={size.width}
                itemWidth={THUMBNAIL_WIDTH}
                cursor={cursor}
                items={thumbnails}
                renderItem={({ key, item, width }) => (
                  <Thumbnail key={key} src={item ? item.src : ''} width={width} />
                )}
              />
            </CenterMarker>
          )}
        </DragScrollController>
      )}
    </SizeMe>
  ));
