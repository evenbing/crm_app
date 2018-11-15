/**
 * @component TextInput.js
 * @description 输入input
 * @time 2018/6/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { theme } from '../constants';

const Input = styled.TextInput`
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  text-align: ${props => props.textAlign};
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.backgroundColor};
  border-color: ${props => props.borderColor};
  border-width: ${props => props.borderWidth};
  border-radius: ${props => props.borderRadius};
  padding: 0 ${props => props.textPadding};
`;

class TextInput extends React.Component {
  render() {
    const {
      onChangeText,
      textPadding,
      refName,
      ...resetProps
    } = this.props;

    return (
      <Input
        placeholderTextColor="#c1c1c1"
        returnKeyType="done"
        returnKeyLabel="done"
        ref={refName}
        clearButtonMode="never"
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={value => onChangeText(value)}
        textPadding={textPadding}
        {...resetProps}
      />
    );
  }
}

TextInput.defaultProps = {
  refer: null,
  width: '100%',
  height: '28px',
  backgroundColor: '#FFF',
  borderColor: '#FFF',
  borderWidth: '0px',
  borderRadius: '0px',
  placeholder: '',
  secureTextEntry: false,
  keyboardType: 'default',
  autoFocus: false,
  maxLength: 128,
  value: '',
  onChangeText: () => null,
  onSubmitEditing: null,
  selectionColor: 'grey',
  color: theme.textColor,
  fontSize: 14,
  textAlign: 'left',
  textPadding: '5px',
  style: null,
  editable: true,
  refName: () => null,
};

TextInput.propTypes = {
  refer: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.string,
  borderRadius: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  selectionColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  textAlign: PropTypes.string,
  textPadding: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  editable: PropTypes.bool,
  refName: PropTypes.func,
};

export default TextInput;
