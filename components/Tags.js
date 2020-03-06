import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Tags = () => {
  const tags = ["#Helsinki", "#Vantaa", "#Tampere"];
  return (
    <View style={styles.view}>
      <ScrollView horizontal>
        {tags.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 15,
    margin: 2,
    borderWidth: 0.2,
    borderRadius: 30
  },

  view: {
    marginHorizontal:20,
    marginVertical:10,
  }
});

export default Tags;
