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

const SearchView = styled.View`
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
`;

const SearchButtonView = styled(TouchableView)`
  position: absolute;
  bottom: ${moderateScale(7)};
  right: ${moderateScale(13)};
  height: 98%;
  width: ${moderateScale(18)};
  justify-content: center;
`;

class SearchInput extends React.Component {
  render() {
    const {
      searchWidth,
      searchStyle,
      onChangeText,
      onSearch,
      value,
      ...resetProps
    } = this.props;
    return (
      <SearchView
        width={searchWidth}
        style={searchStyle}
      >
        <TextInput
          placeholderTextColor="#c1c1c1"
          returnKeyType="done"
          returnKeyLabel="done"
          clearButtonMode="never"
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={onChangeText}
          {...resetProps}
          textPadding={`${moderateScale(10)}px`}
          value={value}
        />
        <SearchButtonView
          onPress={onSearch}
        >
          <SuffixImage
            source={require('../img/search.png')}
          />
        </SearchButtonView>
      </SearchView>
    );
  }
}

SearchInput.defaultProps = {
  searchWidth: 0,
  onChangeText: () => null,
  value: '',
  onSearch: () => null,
  searchStyle: {},
};

SearchInput.propTypes = {
  searchWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSearch: PropTypes.func,
  searchStyle: PropTypes.objectOf(PropTypes.any),
};

export default SearchInput;
