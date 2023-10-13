import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DeviceMotion } from "expo-sensors";
import { useEffect, useState } from "react";

let count = 0;

function GyrosensorScreen({ navigation: { navigation } }) {
  const [orientation, setOrientation] = useState("protrait");
  const [num, setNum] = useState(0);

  useEffect(() => {
    DeviceMotion.addListener(({ rotation }) => {
      const alpha = Math.floor(Math.abs(rotation.beta));
      setOrientation(alpha === 1 ? "landscape" : "protrait");
      if (orientation === "landscape") {
        count = count + 1;
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{orientation}</Text>
      <Text>{count}</Text>
    </View>
  );
}

export default GyrosensorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
