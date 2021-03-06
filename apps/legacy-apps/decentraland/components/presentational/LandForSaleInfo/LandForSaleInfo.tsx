import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../../../constants/Colors";
import { Button, Icon } from "native-base";
import { formatNumber } from "../../../helpers";
import AssetName from "../AssetName";

import AssetNameProps from "../../../types/AssetNameProps";

const onPriceInfo = (): void => {
  const title = "";
  const message = `MANA is Decentraland’s cryptocurrency token. You can use MANA to buy LAND parcels.`;
  const buttons = [{ text: "Okay" }];
  Alert.alert(title, message, buttons);
};

const styles = StyleSheet.create({
  landInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  landPrice: {
    color: Colors.assetInfoText,
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    paddingTop: responsiveHeight(0.4),
  },
  landPriceContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  landPriceIcon: {
    color: Colors.linkColor,
    marginLeft: responsiveWidth(1.5),
    marginRight: responsiveWidth(1.5),
  },
  nameContainer: {
    flex: 1,
  },
  priceContainer: {
    flex: 1,
  },
});

interface LandForSaleInfoObjectProps {
  priceMana: number;
  asset: AssetNameProps;
}

interface LandForSaleInfoProps {
  landForSale: LandForSaleInfoObjectProps;
}

export const LandForSaleInfo: React.FunctionComponent<LandForSaleInfoProps> = React.memo(
  ({ landForSale }) => {
    const { priceMana, asset } = landForSale;
    const { name } = asset;

    return (
      <View style={styles.landInfoContainer}>
        <View style={styles.nameContainer}>
          <AssetName name={name} />
        </View>
        <View style={styles.priceContainer}>
          <ManaPrice price={priceMana} />
        </View>
      </View>
    );
  }
);

interface ManaPriceProps {
  price: string;
}

export const ManaPrice: React.FunctionComponent<ManaPriceProps> = React.memo(
  ({ price }) => {
    const formattedPrice = formatNumber(price);

    return (
      <View style={styles.landPriceContainer}>
        <View>
          <Button small transparent onPress={onPriceInfo}>
            <Icon
              name="information-circle-outline"
              style={styles.landPriceIcon}
            />
          </Button>
        </View>
        <View>
          <Text style={styles.landPrice}>{formattedPrice}</Text>
        </View>
      </View>
    );
  }
);

export default LandForSaleInfo;
