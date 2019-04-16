import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@constants/Colors";
import ProgressBar from "react-native-progress/Bar";
import PropTypes from "prop-types";

export default function MyAccountProgress({ progress }) {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        color={Colors.loadingColor}
        borderWidth={0}
        unfilledColor={Colors.textColor}
        height={responsiveHeight(1)}
        width={responsiveWidth(101)}
        style={styles.progress}
      />
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% complete
        </Text>
      </View>
    </View>
  );
}

MyAccountProgress.propTypes = {
  progress: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  progress: {
    marginTop: responsiveHeight(10),
  },
  progressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressText: {
    fontWeight: "800",
  },
});
