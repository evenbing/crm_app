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
import { TouchableView } from './common'

const SearcherView = styled.View`
  width: ${props => props.width || '100%'};
  flex-direction: row;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 11px;
  align-items: center;
  background-color: #ffff;
  border: 1px #E0E9FF;
  border-radius: 4px;
`;

const SuffixImage = styled.Image`
  width: 13px;
  height: 13px;
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
          textPadding="0"
          width="90%"
          value={value}
        />
        <TouchableView onPress={onSearch}>
          <SuffixImage
            source={require('../img/member/search.png')}
          />
        </TouchableView>
      </SearcherView>
    );
  }
}

SearchInput.defaultProps = {
  searchWidth: '100%',
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
  onSearch: PropTypes.func
};

export default SearchInput;
