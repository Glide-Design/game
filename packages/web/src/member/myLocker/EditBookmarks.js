import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ContainerPaddingCss, CoreDevices } from '../../common/dimensions';
import { H4, H2 } from '../../common/typography';
import { Button1 } from '../../common/buttons';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  margin-bottom: 16px;

  ${ContainerPaddingCss};
`;

const BookmarkCount = styled.div`
  ${H4};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H2};
  }
`;

const Button = styled(Button1)`
  margin-left: 16px;
  border: none;
  background: #7c52f6;
  box-shadow: 4px 4px 0px #360fa6;
  color: #fff;

  &:hover {
    border: none;
    background: rgba(124, 82, 246, 0.8);
    color: #fff;
  }
`;

class EditBookmarks extends React.Component {
  render() {
    const { bookmarks, editMode, onCancelClick, onDeleteClick, onEditClick } = this.props;
    const bookmarkCount = bookmarks && bookmarks.length;

    return (
      <Container>
        <BookmarkCount>
          <FormattedMessage
            id="myLocker.bookmarkedItems"
            defaultMessage={`{bookmarkCount, number} bookmarked {bookmarkCount, plural,
                one {item}
                other {items}
            }`}
            values={{ bookmarkCount }}
          />
        </BookmarkCount>
        <div>
          {editMode ? (
            <div>
              <Button onClick={onCancelClick} data-test-id="cancel-edit-bookmark">
                <FormattedMessage id="myLocker.editBookmark.cancel" defaultMessage="Cancel" />
              </Button>
              <Button onClick={onDeleteClick} data-test-id="delete-bookmark">
                <FormattedMessage id="myLocker.editBookmark.delete" defaultMessage="Delete" />
              </Button>
            </div>
          ) : (
            <Button onClick={onEditClick} data-test-id="edit-bookmark">
              <FormattedMessage id="myLocker.editBookmark.edit" defaultMessage="Edit" />
            </Button>
          )}
        </div>
      </Container>
    );
  }
}

export default EditBookmarks;
