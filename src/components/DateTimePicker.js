import React from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-native-modal-datetime-picker';

const DateTimePicker = ({
  isVisible,
  mode,
  confirmTextIOS,
  cancelTextIOS,
  titleIOS,
  onConfirm,
  onCancel,
  minimumDate,
  maximumDate,
}) => (
  <Picker
    isVisible={isVisible}
    mode={mode}
    confirmTextIOS={confirmTextIOS}
    cancelTextIOS={cancelTextIOS}
    titleIOS={titleIOS}
    onConfirm={onConfirm}
    onCancel={onCancel}
    minimumDate={minimumDate}
    maximumDate={maximumDate}
  />
);

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
  onCancel: PropTypes.func.isRequired,
  minimumDate: PropTypes.instanceOf(Date),
  maximumDate: PropTypes.instanceOf(Date),
};

export default DateTimePicker;
