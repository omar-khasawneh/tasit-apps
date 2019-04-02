import React from "react";
import { connect } from "react-redux";
import {
  addLandForSaleToList,
  selectLandToBuy,
  setLoadingAssetsForSaleInProgress,
} from "../redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import {
  addressesAreEqual,
  showError,
  showInfo,
  getContracts,
} from "../helpers";
import { Root } from "native-base";

import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";

import AssetTypes from "@constants/AssetTypes";
const { ESTATE, PARCEL } = AssetTypes;

export class ListLandForSaleScreen extends React.Component {
  componentDidMount = async () => {
    // TODO: Remove me before merging
    console.log("componentDidMount");
    try {
      // TODO: Remove me before merging
      console.log("About to call _loadAssetsForSale");
      showInfo("Loading land for sale...");
      await this._loadAssetsForSale();
    } catch (err) {
      // TODO: Remove me before merging
      console.log("Error with _loadAssetsForSale", err);
      showError(err);
    }
  };

  _loadAssetsForSale = async () => {
    // TODO: Remove me before merging
    console.log("Called _loadAssetsForSale");
    const {
      addLandForSaleToList,
      setLoadingAssetsForSaleInProgress,
    } = this.props;

    const decentralandUtils = new DecentralandUtils();
    const { getOpenSellOrders } = decentralandUtils;

    const fromBlock = 0;
    // TODO: Remove me before merging
    console.log("About to getOpenSellOrders");
    const openSellOrdersEvents = await getOpenSellOrders(fromBlock);
    // TODO: Remove me before merging
    console.log("Done with getOpenSellOrders");
    let contracts = getContracts();
    const { estateContract } = contracts;

    const estatesForSale = [];
    for (let event of openSellOrdersEvents) {
      let { values: order } = event;
      const { nftAddress } = order;
      const isEstate = addressesAreEqual(
        nftAddress,
        estateContract.getAddress()
      );
      if (isEstate) estatesForSale.push(order);
    }

    // Note: Getting only the first 10 assets for now
    // See more: https://github.com/tasitlabs/tasit/issues/155
    const listSize = 10;
    for (let order of estatesForSale.slice(0, listSize)) {
      let assetForSale = await this._prepareAssetForSale(order);
      addLandForSaleToList(assetForSale);
    }

    setLoadingAssetsForSaleInProgress(false);
  };

  _prepareAssetForSale = async assetForSale => {
    const { nftAddress } = assetForSale;
    let contracts = getContracts();
    const { estateContract, landContract } = contracts;

    const isParcel = addressesAreEqual(nftAddress, landContract.getAddress());
    const isEstate = addressesAreEqual(nftAddress, estateContract.getAddress());

    if (isEstate) {
      return await this._prepareEstateForSale(estateContract, assetForSale);
    } else if (isParcel) {
      return await this._prepareParcelForSale(landContract, assetForSale);
    } else {
      throw new Error(`The asset should be a parcel of land or an estate.`);
    }
  };

  _prepareEstateForSale = async (estateContract, estateForSale) => {
    const { id, assetId, seller, priceInWei, expiresAt } = estateForSale;

    const estateId = `${assetId}`;

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    // Get mana price using string to avoid imprecise rounding (i.e.: 57999.99999999999)
    // TODO: Use TasitSDK Utils to dealing with BigNumbers (will be implemented on v0.2.0)
    const priceManaInWei = `${priceInWei}`;
    const intPriceManaLength = priceManaInWei.length - 18;
    const intPriceMana = priceManaInWei.substring(0, intPriceManaLength);
    const priceMana = intPriceMana;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
    const name = await estateContract.getMetadata(assetId);
    const imgUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`;

    return {
      id,
      priceManaInWei,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      asset: {
        type: ESTATE,
        id: estateId,
        name,
        img: imgUrl,
      },
    };
  };

  _prepareParcelForSale = async (landContract, parcelForSale) => {
    const { id, assetId, seller, priceInWei, expiresAt } = parcelForSale;

    const parcelId = `${assetId}`;

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    // Get mana price using string to avoid imprecise rounding (i.e.: 57999.99999999999)
    // TODO: Use TasitSDK Utils to dealing with BigNumbers (will be implemented on v0.2.0)
    const priceManaInWei = `${priceInWei}`;
    const intPriceManaLength = priceManaInWei.length - 18;
    const intPriceMana = priceManaInWei.substring(0, intPriceManaLength);
    const priceMana = intPriceMana;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
    const namePromise = landContract.tokenMetadata(parcelId);
    const coordsPromise = landContract.decodeTokenId(parcelId);
    const [name, coords] = await Promise.all([namePromise, coordsPromise]);
    const [x, y] = coords;
    const imgUrl = `https://api.decentraland.org/v1/parcels/${x}/${y}/map.png`;

    return {
      id,
      priceManaInWei,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      asset: {
        type: PARCEL,
        id: parcelId,
        name,
        img: imgUrl,
      },
    };
  };

  _renderItem = ({ item: landForSale }) => {
    const { navigation, selectLandToBuy } = this.props;
    const handlePress = () => {
      selectLandToBuy(landForSale);
      navigation.navigate("BuyLandScreen");
    };

    return (
      <LandForSaleListItem landForSale={landForSale} onPress={handlePress} />
    );
  };

  render() {
    const { assetsForSale } = this.props;
    const { list, loadingInProgress } = assetsForSale;
    // TODO: Remove me before merging
    console.log("Loading in progress", loadingInProgress);

    return (
      <Root>
        <LandForSaleList
          landForSaleList={list}
          renderItem={this._renderItem}
          loadingInProgress={loadingInProgress}
        />
      </Root>
    );
  }
}

ListLandForSaleScreen.propTypes = {
  assetsForSale: PropTypes.object.isRequired,
  addLandForSaleToList: PropTypes.func.isRequired,
  selectLandToBuy: PropTypes.func.isRequired,
  setLoadingAssetsForSaleInProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { assetsForSale } = state;
  return { assetsForSale };
};

const mapDispatchToProps = {
  addLandForSaleToList,
  setLoadingAssetsForSaleInProgress,
  selectLandToBuy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandForSaleScreen);
