import React from "react";
import { View, Image, Dimensions, ScrollView, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export const Library = props => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {props.images.map((image, key) => {
          if ((key + 2) % 3 === 0) {
            return (
              <Image
                key={key}
                source={{ uri: image.node.image.uri }}
                style={[styles.image, , { marginRight: 2, marginLeft: 2 }]}
              />
            );
          } else {
            return (
              <Image
                key={key}
                source={{ uri: image.node.image.uri }}
                style={[styles.image]}
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

Library.propTypes = {
  images: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  scroll: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  image: {
    width: (width - 4) / 3,
    height: (width - 4) / 3,
    marginBottom: 2
  }
});
