/**
 * @component DateTimePicker.js
 * @description 时间选择组件页面
 * @time 2018/8/13
 * @author *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Picker from 'react-native-modal-datetime-picker';

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
    this.setState({
      isVisible: true,
      date: new Date(),
    });
  };
  onHideModal = () => {
    this.setState({ isVisible: false });
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
      },
    } = this;
    return (
      <ContainerView>
        <TouchableView onPress={this.onShowModal}>
          {children}
        </TouchableView>
        <Picker
          isVisible={isVisible}
          date={date}
          mode={mode}
          confirmTextIOS={confirmTextIOS}
          cancelTextIOS={cancelTextIOS}
          titleIOS={titleIOS}
          onConfirm={this.onConfirm}
          onCancel={this.onHideModal}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
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
};

export default DateTimePicker;
