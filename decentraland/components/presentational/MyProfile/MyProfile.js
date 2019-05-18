import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "@constants/Colors";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import MyProfileCreationStatusItem from "@presentational/MyProfileCreationStatusItem";
import ActionStatus from "@constants/ActionStatus";
import MyProfileProgress from "@presentational/MyProfileProgress";
import WalletButton from "@presentational/WalletButton";

export default function MyProfile({ progress, creationSteps }) {
  return (
    <View style={styles.container}>
      <MyProfileProgress progress={progress} />
      <View style={styles.actionItemsContainer}>
        <WalletButton appName="gnosis-safe-smart-wallet" scheme="gnosis-safe" />
        <WalletButton appName="tasit-wallet" scheme="tasit-wallet" />

        {creationSteps.map(action => {
          const { name, status } = action;

          return (
            <MyProfileCreationStatusItem
              key={name}
              name={name}
              status={status}
            />
          );
        })}
      </View>
    </View>
  );
}

MyProfile.propTypes = {
  progress: PropTypes.number,
  creationSteps: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(Object.values(ActionStatus)),
      name: PropTypes.string,
    })
  ),
};

const styles = StyleSheet.create({
  actionItemsContainer: {
    flex: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: responsiveWidth(12),
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
