import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// utils
import { isIos } from 'utils/utils';
import { delay, formatNumberToString } from 'utils/base';

// constants
import { theme } from 'constants';

// components
import {
  ContainerView,
  ContainerScrollView,
} from 'components/Styles/Layout';
import {
  CommStatusBar,
  LeftBackIcon,
  RightView,
} from 'components/Layout';
import NavInputItem from 'components/NavInputItem';
import {
  TextareaGroup,
  TextareaView,
} from 'components/Styles/Editor';
import Thumbnail from 'components/Thumbnail';
import { CenterText } from 'components/Styles/Form';

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
  state = {
    id: null,
    productName: null,
    standardPrice: null,
    salesPrice: null,
    salesNumber: null,
    comment: null,
    discount: null,
    salesTotalPrice: null,
    attachmentList: [],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getSalesTotalPrice();
    this.initState();
  }

  onPressRight = () => {
    const {
      goBack,
      state: { params: { callback } },
    } = this.props.navigation;
    callback && callback(this.state);
    goBack();
  }

  onFocus = async (y = 40) => {
    await delay();
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(isIos() ? y : y + 30),
      animated: true,
    });
  };
  getSalesTotalPrice = () => {
    const {
      salesPrice,
      salesNumber,
      discount,
    } = this.state;
    let salesTotalPrice = 0;
    if (salesPrice && salesNumber) {
      salesTotalPrice = Number(salesPrice) * Number(salesNumber) || 0;
    }
    if (salesTotalPrice && discount && discount <= 100 && discount > 0) {
      salesTotalPrice *= (discount / 100);
    }
    this.setState({ salesTotalPrice: Number(salesTotalPrice).toFixed(2) });
  };

  initState = () => {
    const {
      props: {
        navigation: { state },
      },
    } = this;
    const { params = {} } = state || {};
    if (!Object.keys(params).length) return;
    this.setState({
      ...formatNumberToString(params),
      attachmentList: params.attachmentList || [],
    });
  };

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
      <ContainerScrollView
        bottomPadding
        innerRef={(ref) => { this.scrollViewRef = ref; }}
      >
        <CommStatusBar />
        <ProductImage >
          <Thumbnail
            imgUri={attachmentList.length ? attachmentList[0].filePath : null}
            size={120}
          />
          <Name>{productName}</Name>
          <StandPrice> {`标准价格: ${standardPrice}`} </StandPrice>
        </ProductImage>
        <ContainerView
          backgroundColor={theme.whiteColor}
        >
          <NavInputItem
            leftText="销售单价"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: '请输入销售单价',
                value: salesPrice,
                onChangeText: async (salesPrice) => {
                  await this.setState({ salesPrice });
                  this.getSalesTotalPrice();
                },
              })}
          />
          <NavInputItem
            leftText="数量"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: '请输入数量',
                value: salesNumber,
                onChangeText: async (salesNumber) => {
                  await this.setState({ salesNumber });
                  this.getSalesTotalPrice();
                },
                onFocus: () => this.onFocus(60),
              })}
          />
          <NavInputItem
            leftText="折扣%"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: '请输入折扣',
                value: discount,
                onChangeText: async (discount) => {
                  await this.setState({ discount });
                  this.getSalesTotalPrice();
                },
                onFocus: () => this.onFocus(80),
              })}
          />
          <NavInputItem
            leftText="总价"
            center={
              <CenterText active>{salesTotalPrice}</CenterText>
              }
            {...theme.navItemOnlyShowStyle}
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
              onFocus={() => this.onFocus(180)}
              onBlur={() => this.onFocus(0)}
            />
          </TextareaGroup>
        </ContainerView>
      </ContainerScrollView>
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
        onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
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
