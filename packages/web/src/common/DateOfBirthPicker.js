import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ValidationRed, Grey15 } from 'xi-core/colours';
import { getSignupRestrictionLessThanAge } from 'xi-core/config/selectors';

const DateOfBirthRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  span {
    flex-grow: 1;
  }
`;

const SelectContainer = styled.div`
  position: relative;

  ${({ value, placeholder }) =>
    !placeholder || value !== ''
      ? ''
      : `
    &:before {
      content: '${placeholder}';
      left: 14px;
      top: 20px;
      position: absolute;
      color: #aaa;
      font-size: 10px;
      pointer-events: none;
    }
  `};

  &:after {
    content: '';
    border: solid #aaa;
    border-width: 0 1px 1px 0;
    padding: 2px;
    transform: rotate(45deg);
    right: 0px;
    top: 20px;
    position: absolute;
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  height: 47px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 0;
  border-bottom: solid 1px ${Grey15};
  font-size: 14px;
  color: #fff;
  padding-right: 14px;
  padding-left: 8px;
  border-radius: 0;
  margin-right: 10px;

  /* Hide down arrow */
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  option {
    color: #000;
  }
`;

const ErrorState = styled.div`
  color: ${ValidationRed};
  margin-left: 20px;
`;

const ErrorText = styled.div`
  color: ${ValidationRed};
`;

const Picker = connect(state => ({ minAge: getSignupRestrictionLessThanAge(state) }))(
  ({
    day,
    month,
    year,
    daySelectProps,
    monthSelectProps,
    yearSelectProps,
    error = false,
    showLabel = true,
    minAge,
  }) => {
    const currentYear = new Date().getFullYear();
    return (
      <React.Fragment>
        <DateOfBirthRow>
          {showLabel ? <span>Date of birth:</span> : null}
          <SelectContainer value={day} placeholder={'DD'} data-test-id="date-of-birth-day">
            <StyledSelect {...daySelectProps}>
              <option disabled />
              {Array.from(Array(31).keys()).map((val, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </StyledSelect>
          </SelectContainer>
          <SelectContainer value={month} placeholder={'MMM'} data-test-id="date-of-birth-month">
            <StyledSelect {...monthSelectProps}>
              <option disabled />
              {[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ].map((month, i) => (
                <option value={i} key={i}>
                  {month}
                </option>
              ))}
            </StyledSelect>
          </SelectContainer>
          <SelectContainer value={year} placeholder={'YYYY'} data-test-id="date-of-birth-year">
            <StyledSelect {...yearSelectProps}>
              <option disabled />
              {Array.from(Array(100).keys()).map((val, i) => (
                <option value={currentYear - 100 + i} key={i}>
                  {currentYear - 100 + i}
                </option>
              ))}
            </StyledSelect>
          </SelectContainer>
          {error && <ErrorState data-test-id="date-of-birth-error">X</ErrorState>}
        </DateOfBirthRow>
        {error && error.id && (
          <ErrorText>
            <FormattedMessage {...error} values={{ age: minAge }} />
          </ErrorText>
        )}
      </React.Fragment>
    );
  }
);

class DateOfBirthPicker extends React.Component {
  state = {
    day: '',
    month: '',
    year: '',
  };

  onChange = (e, name) => {
    this.setState({ [name]: e.target.value }, () => {
      const { changed } = this.props;
      const { day, month, year } = this.state;
      if (changed) {
        changed(day, month, year);
      }
    });
  };

  render() {
    const { day, month, year } = this.state;

    return (
      <Picker
        {...{
          day,
          month,
          year,
          daySelectProps: { value: day, onChange: e => this.onChange(e, 'day') },
          monthSelectProps: { value: month, onChange: e => this.onChange(e, 'month') },
          yearSelectProps: { value: year, onChange: e => this.onChange(e, 'year') },
        }}
      />
    );
  }
}

export default DateOfBirthPicker;

export const DateOfBirthPickerReduxForm = ({ year, month, day, showLabel }) => {
  const anyTouched = year.meta.dirty || month.meta.dirty || day.meta.dirty;
  return (
    <Picker
      {...{
        day: day.input.value,
        month: month.input.value,
        year: year.input.value,
        daySelectProps: { ...day.input },
        monthSelectProps: { ...month.input },
        yearSelectProps: { ...year.input },
        error: anyTouched && day.meta.invalid ? day.meta.error : false,
        showLabel,
      }}
    />
  );
};
