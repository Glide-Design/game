import React, { Fragment } from 'react';
import { Fields } from 'redux-form';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Grey20 } from 'xi-core/colours';
import { DateOfBirthPickerReduxForm } from '../../common/DateOfBirthPicker';
import HelpIcon from '../../common/icons/Help';

const HelpIconWrapper = styled.div`
  flex: 0 0 40px;

  svg {
    margin-top: 15px;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`;

const ButtonContainer = styled.div`
  margin-right: 10px;
`;

const HelpText = styled.div`
  color: ${Grey20};
  font-size: 12px;
  margin-top: 5px;
`;

export default class extends React.Component {
  state = {
    showBirthdayHelp: false,
  };

  render() {
    const { showBirthdayHelp } = this.state;
    return (
      <Fragment>
        <FieldWrapper>
          <ButtonContainer>
            <Fields
              names={['day', 'month', 'year']}
              component={props => {
                return <DateOfBirthPickerReduxForm {...props} showLabel={false} />;
              }}
            />
          </ButtonContainer>
          <HelpIconWrapper
            onClick={() => {
              this.setState({
                showBirthdayHelp: !showBirthdayHelp,
              });
            }}
          >
            <HelpIcon />
          </HelpIconWrapper>
        </FieldWrapper>

        {showBirthdayHelp ? (
          <HelpText>
            <FormattedMessage
              id="signUpWithEmail.birthdayHelp"
              defaultMessage="Your date of birth lets us make your OTRO experience suitable for your age. This information remains private. "
            />
          </HelpText>
        ) : null}
      </Fragment>
    );
  }
}
