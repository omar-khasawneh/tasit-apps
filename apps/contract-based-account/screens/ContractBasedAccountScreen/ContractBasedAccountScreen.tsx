import * as React from "react";
import { StyleSheet } from "react-native";

import ContractBasedAccountInfo from "./components/ContractBasedAccountInfo";
import { Text, View } from "../../shared/components/Themed";

import { hooks } from "tasit";
const { useGnosisSafe } = hooks;

import useRandomBytes from "../../hooks/useRandomBytes";

// const BASE_URL = "https://safe-relay.rinkeby.gnosis.io/"; // Rinkeby
const BASE_URL = "https://safe-relay.staging.gnosisdev.com/api"; // Mainnet staging

export default function ContractBasedAccountScreen(): JSX.Element {
  const {
    randomBytes,
    // isLoading: isLoadingBytes
  } = useRandomBytes(5);

  const isLoadingBytes = randomBytes.length === 0;

  const {
    address,
    hasError,
    // isLoading: isLoadingSafe
  } = useGnosisSafe(
    ["0x80F8f3629b58b0b2873c6424cDe17540F645df16"], // TODO: Use address from the other screen
    1,
    randomBytes,
    BASE_URL
  );

  const isLoadingSafe = address === "";

  if (isLoadingBytes) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading random bytes</Text>
      </View>
    );
  }
  if (isLoadingSafe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Gnosis Safe</Text>
      </View>
    );
  }
  if (hasError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contract-based account</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ContractBasedAccountInfo address={address} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
