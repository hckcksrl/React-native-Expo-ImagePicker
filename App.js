import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { Permissions, ImagePicker } from "expo";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null
    };
  }

  imagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      exif: true,
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        return true;
      }
    }
  }

  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        {this.state.image && (
          <Image
            source={{ uri: this.state.image }}
            style={{ width: width / 2, height: height / 2 }}
          />
        )}
        <TouchableOpacity
          onPress={this.imagePick}
          style={{ backgroundColor: "#aaaaaa", paddingBottom: 20 }}
        >
          <Text style={{ color: "black" }}>Image Picker</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
