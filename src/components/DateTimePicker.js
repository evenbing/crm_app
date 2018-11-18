/**
 * @component DateTimePicker.js
 * @description 时间选择组件页面
 * @time 2018/8/13
 * @author *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DatePicker } from 'antd-mobile-rn';

// components
import TouchableView from './TouchableView';

const ContainerView = styled.View``;

class DateTimePicker extends React.PureComponent {
  state = {
    isVisible: false,
    date: new Date(),
  };
  onConfirm = (date) => {
    this.props.onConfirm(date);
    this.onHideModal();
  };
  onShowModal = () => {
    const {
      props: {
        isEnd,
        minuteInterval,
      },
    } = this;
    const currDate = new Date();
    const year = currDate.getFullYear();
    const month = currDate.getMonth();
    let date = currDate.getDate();
    let hour = currDate.getHours();
    let minutes = currDate.getMinutes();
    if (minuteInterval === 30) {
      if (minutes <= 30) {
        minutes = 30;
      } else {
        minutes = 0;
        if (hour === 23) {
          hour = 0;
          date += 1;
        } else {
          hour += 1;
        }
      }
    }
    if (isEnd) {
      if (hour === 23) {
        hour = 0;
        date += 1;
      } else {
        hour += 1;
      }
    }
    this.setState({
      isVisible: true,
      date: new Date(year, month, date, hour, minutes),
    });
  };
  onHideModal = () => {
    this.setState({ isVisible: false });
  };
  onChange = (date) => {
    this.setState({ date });
    this.props.onConfirm(date);
  };
  render() {
    const {
      state: {
        isVisible,
        date,
      },
      props: {
        mode,
        confirmTextIOS,
        cancelTextIOS,
        titleIOS,
        minimumDate,
        maximumDate,
        children,
        minuteInterval,
      },
    } = this;
    return (
      <ContainerView>
        <TouchableView onPress={this.onShowModal}>
          {children}
        </TouchableView>
        <DatePicker
          visible={isVisible}
          value={date}
          mode={mode}
          confirmTextIOS={confirmTextIOS}
          cancelTextIOS={cancelTextIOS}
          title={titleIOS}
          onChange={this.onChange}
          onOk={this.onHideModal}
          onDismiss={this.onHideModal}
          minDate={minimumDate}
          maxDate={maximumDate}
          minuteStep={minuteInterval}
        />
      </ContainerView>
    );
  }
}

DateTimePicker.defaultProps = {
  isVisible: false,
  mode: 'datetime',
  confirmTextIOS: '确定',
  cancelTextIOS: '取消',
  titleIOS: '请选择时间',
  minimumDate: new Date(1970, 1, 1),
  maximumDate: new Date(2099, 1, 1),
  isEnd: false,
  minuteInterval: 1,
};

DateTimePicker.propTypes = {
  isVisible: PropTypes.bool,
  mode: PropTypes.string,
  confirmTextIOS: PropTypes.string,
  cancelTextIOS: PropTypes.string,
  titleIOS: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  minimumDate: PropTypes.instanceOf(Date),
  maximumDate: PropTypes.instanceOf(Date),
  children: PropTypes.node.isRequired,
  isEnd: PropTypes.bool,
  minuteInterval: PropTypes.number,
};

export default DateTimePicker;
