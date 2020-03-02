import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { getBookmarks, getMemberId, getIsLoading } from 'xi-core/member/selectors';
import {
  fetchBookmarks,
  removeBookmarkFromLocker,
  setBookmarkStatus,
} from 'xi-core/member/actions';
import { ContainerPaddingCss, CoreDevices, NAVBAR_HEIGHT_PX } from '../../common/dimensions';
import CardSection from '../../content/components/CardSection';
import Card from '../../content/components/Card';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import { H2, H6 } from '../../common/typography';
import LoaderSpinner from '../../common/LoaderSpinner';
import { getTargetDevice } from '../../state/app/selectors';
import EditBookmarks from './EditBookmarks';
import NoBookmarks from './NoBookmarks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #000;
  box-sizing: border-box;

  @media ${CoreDevices.tiny} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.tiny}px);
    padding-top: ${NAVBAR_HEIGHT_PX.tiny}px;
  }

  @media ${CoreDevices.small} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.small}px);
    padding-top: ${NAVBAR_HEIGHT_PX.small}px;
  }

  @media ${CoreDevices.medium} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.medium}px);
    padding-top: ${NAVBAR_HEIGHT_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.large}px);
    padding-top: 0;
  }
`;

const TabContainer = styled.div`
  border-bottom: solid 1px #e3e3e3;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
  text-transform: upppercase;
  ${ContainerPaddingCss};

  @media ${CoreDevices.large} {
    justify-content: flex-start;
    margin-bottom: 11px;
  }
`;

const TabTitle = styled.h6`
  ${H6};
  border-bottom: solid 3px #7c52f6;
  padding: 20px;

  @media ${CoreDevices.large} {
    ${H2};
  }
`;

const Bookmarks = styled.div`
  color: #000;
`;

const StyledProfileTopIcons = styled(ProfileTopIcons)`
  // background: #000;
`;

const StyledLoaderSpinner = styled(LoaderSpinner)`
  margin: auto;
`;

class MyLocker extends React.Component {
  state = {
    editMode: false,
    selected: [],
  };

  async componentDidMount() {
    this.props.fetchBookmarks(this.props.memberId);
  }

  deleteBookmark = externalId => {
    const { removeBookmarkFromLocker, setBookmarkStatus } = this.props;

    removeBookmarkFromLocker(externalId);
    setBookmarkStatus(externalId, false);
  };

  onCancelClick = event => {
    event.preventDefault();
    this.setState({ editMode: false, selected: [] });
  };

  onDeleteClick = event => {
    const { selected } = this.state;
    event.preventDefault();

    selected.forEach(externalId => this.deleteBookmark(externalId));

    this.setState({ editMode: false, selected: [] });
  };

  onEditClick = event => {
    event.preventDefault();
    this.setState({ editMode: true });
  };

  onSelectClick = externalId => event => {
    const { selected } = this.state;
    let newSelected = selected.filter(id => id !== externalId);

    event.preventDefault();

    if (!selected.includes(externalId)) {
      newSelected.push(externalId);
    }

    this.setState({ selected: newSelected });
  };

  render() {
    const { bookmarks, isLoading, targetDevice } = this.props;
    const { editMode, selected } = this.state;
    const largeDevice = targetDevice === 'large';
    const swipeActionProp = !largeDevice && { swipeAction: this.deleteBookmark };

    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={<FormattedMessage id="myLocker.myLocker" defaultMessage="My locker" />}
          />
        )}
        <TabContainer>
          <TabTitle>
            <FormattedMessage id="myLocker.bookmarked" defaultMessage="Bookmarks" />
          </TabTitle>
        </TabContainer>
        {isLoading ? (
          <StyledLoaderSpinner />
        ) : bookmarks && bookmarks.length > 0 ? (
          <Bookmarks>
            {largeDevice && (
              <EditBookmarks
                bookmarks={bookmarks}
                editMode={editMode}
                onCancelClick={this.onCancelClick}
                onDeleteClick={this.onDeleteClick}
                onEditClick={this.onEditClick}
              />
            )}
            <CardSection
              items={bookmarks.map((item, i) => {
                const editModeProp = editMode
                  ? {
                      editMode: true,
                      onSelectClick: this.onSelectClick,
                      isSelected: selected.includes(item.externalId),
                    }
                  : null;

                return (
                  <Card key={item.externalId} item={item} {...swipeActionProp} {...editModeProp} />
                );
              })}
            />
          </Bookmarks>
        ) : (
          <NoBookmarks />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  bookmarks: getBookmarks(state),
  isLoading: getIsLoading(state),
  memberId: getMemberId(state),
  targetDevice: getTargetDevice(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBookmarks: memberId => dispatch(fetchBookmarks(memberId)),
  removeBookmarkFromLocker: dispatch(removeBookmarkFromLocker),
  setBookmarkStatus: (contentId, isBookmarked) =>
    dispatch(setBookmarkStatus(contentId, isBookmarked)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLocker);
