/**
 * @component SearchInput.js
 * @description 搜索Input
 * @time 2018/6/30
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from './TextInput';
import TouchableView from './TouchableView';
import { moderateScale } from '../utils/scale';

const SearcherView = styled.View`
  width: ${props => props.width ? moderateScale(props.width) : '100%'};
  flex-direction: row;
  justify-content: space-between;
  padding: ${moderateScale(8)}px ${moderateScale(15)}px;
  align-items: center;
  border-radius: ${moderateScale(4)};
  position: relative;
`;

const SuffixImage = styled.Image`
  width: ${moderateScale(13)};
  height: ${moderateScale(13)};
  position: absolute;
  bottom: ${moderateScale(-7)};
  right: ${moderateScale(13)};
`;

class SearchInput extends React.Component {
  render() {
    const {
      searchWidth,
      onChangeText,
      onSearch,
      value,
      ...resetProps
    } = this.props;
    return (
      <SearcherView width={searchWidth}>
        <TextInput
          placeholderTextColor="#c1c1c1"
          returnKeyType="done"
          returnKeyLabel="done"
          clearButtonMode="never"
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={val => onChangeText(val)}
          {...resetProps}
          textPadding={`${moderateScale(10)}px`}
          value={value}
        />
        <TouchableView onPress={onSearch}>
          <SuffixImage
            source={require('../img/search.png')}
          />
        </TouchableView>
      </SearcherView>
    );
  }
}

SearchInput.defaultProps = {
  searchWidth: 0,
  onChangeText: () => null,
  value: '',
  onSearch: () => null,
};

SearchInput.propTypes = {
  searchWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSearch: PropTypes.func,
};

export default SearchInput;
