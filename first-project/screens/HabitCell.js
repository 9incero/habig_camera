import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
  } from "react-native";
  import BouncyCheckbox from "react-native-bouncy-checkbox";
  import React from "react";
  
  const Item = ({
    item,
    onPress,
    Checked,
    setCheckedItems,
    CheckedItems,
    change_habit,
  }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={item.img}
          style={{ width: 25, height: 25, marginRight: 10 }}
        />
        <Text style={styles.name}>{item.name} </Text>
        <BouncyCheckbox
          size={28}
          fillColor="#ffce57"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#ffce57" }}
          isChecked={Checked}
          onPress={(isChecked) => {
            CheckedItems = new Set();
            if (isChecked) {
              CheckedItems.add(item.name);
              setCheckedItems(CheckedItems);
  
              change_habit("/savehabit", item.name);
            } else if (!isChecked && CheckedItems.has(item.name)) {
              CheckedItems.delete(item.name);
              setCheckedItems(CheckedItems);
  
              change_habit("/deletehabit", item.name);
            }
          }}
        />
  
        {/* <Text style={styles.age}>{item.age} years old</Text>
    <Text style={styles.gender}>
      {item.gender} {item.gender == "Male" ? "♂" : "♀"}
    </Text> */}
      </View>
    </TouchableOpacity>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      borderRadius: 20,
      padding: 20,
      marginBottom: 10,
      backgroundColor: "rgba(255, 251, 241, 3)",
    },
    name: {
      flex: 1,
      color: "black",
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
      alignSelf: "flex-end",
    },
    gender: {
      color: "black",
      fontSize: 15,
    },
    age: {
      color: "black",
      fontSize: 15,
    },
    button: { textAlign: "right" },
  });
  
  export default Item;