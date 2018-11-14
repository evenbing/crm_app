import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ContainerView,
  ContainerScrollView,
} from '../../../components/Styles/Layout';
import {
  CommStatusBar,
  LeftBackIcon,
  RightView,
} from '../../../components/Layout';
import { theme } from '../../../constants';
import NavInputItem from '../../../components/NavInputItem';
import {
  TextareaGroup,
  TextareaView,
} from '../../../components/Styles/Editor';
import Thumbnail from '../../../components/Thumbnail';

const ProductImage = styled.View`
  padding-top: ${theme.moderateScale(14)}px;
  padding-bottom: ${theme.moderateScale(19)}px;
  align-items: center;
`;

const Name = styled.Text`
  font-size: ${theme.moderateScale(16)}px;
  color: ${theme.textFormColor};
  margin-top: ${theme.moderateScale(15)}px;
  margin-bottom: ${theme.moderateScale(5)}px;
`;

const StandPrice = styled.Text`
  font-size: ${theme.moderateScale(14)}px;
  color: ${theme.textWeekColor};
`;

class ModifyProductPrice extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      id,
      productName = null,
      standardPrice = null,
      salesPrice = '',
      salesNumber = '',
      comment = '',
      discount = '',
      salesTotalPrice = '',
      attachmentList = [],
    } = props.navigation.state.params;
    this.state = {
      id,
      productName,
      standardPrice,
      salesPrice,
      salesNumber,
      comment,
      discount,
      salesTotalPrice,
      attachmentList,
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }

  onPressRight = () => {
    const {
      goBack,
      state: { params: { callback } },
    } = this.props.navigation;
    callback && callback(this.state);
    goBack();
  }

  render() {
    const {
      productName,
      standardPrice,
      salesPrice,
      salesNumber,
      discount,
      comment,
      salesTotalPrice,
      attachmentList,
    } = this.state;
    return (
      <ContainerView>
        <CommStatusBar />
        <ProductImage >
          <Thumbnail
            imgUri={attachmentList.length ? attachmentList[0].filePath : null}
            size={120}
          />
          <Name>{productName}</Name>
          <StandPrice> {`标准价格: ${standardPrice}`} </StandPrice>
        </ProductImage>
        <ContainerScrollView
          bottomPadding
          backgroundColor={theme.whiteColor}
        >
          <NavInputItem
            leftText="销售单价"
            {...theme.getLeftStyle({
              placeholder: '请输入销售单价',
              value: salesPrice,
              onChangeText: salesPrice => this.setState({ salesPrice }),
            })}
          />
          <NavInputItem
            leftText="数量"
            {...theme.getLeftStyle({
              placeholder: '请输入数量',
              value: salesNumber,
              onChangeText: salesNumber => this.setState({ salesNumber }),
            })}
          />
          <NavInputItem
            leftText="折扣%"
            {...theme.getLeftStyle({
              placeholder: '请输入折扣',
              value: discount,
              onChangeText: discount => this.setState({ discount }),
            })}
          />
          <NavInputItem
            leftText="总价"
            {...theme.getLeftStyle({
              placeholder: '请输入总价',
              value: salesTotalPrice,
              onChangeText: salesTotalPrice => this.setState({ salesTotalPrice }),
            })}
          />
          <NavInputItem
            leftText="备注"
            height={44}
            center={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={2}
              bordered
              value={comment}
              onChangeText={comment => this.setState({ comment })}
              placeholder="请输入备注，十字以内"
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ContainerScrollView>
      </ContainerView>
    );
  }
}

ModifyProductPrice.navigationOptions = ({ navigation }) => {
  const { goBack } = navigation;
  return ({
    title: '修改产品报价',
    headerLeft: (
      <LeftBackIcon
        onPress={() => goBack()}
      />
    ),
    headerRight: (
      <RightView
        onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
        right="完成"
        rightStyle={{
          color: theme.primaryColor,
        }}
      />
    ),
  });
};

ModifyProductPrice.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};
export default ModifyProductPrice;
