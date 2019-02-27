import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Permissions, Camera } from "expo";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Picture extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      flash: Camera.Constants.FlashMode.on,
      autoFocus: Camera.Constants.AutoFocus.on
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _typeChange = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  _flashChange = () => {
    this.setState({
      flash:
        this.state.flash === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
    });
  };

  _takeCamera = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 0.5,
        exif: true
      });
      console.log(photo);
    }
  };

  render() {
    const { hasCameraPermission, flash } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.camera}
            type={this.state.type}
          >
            <TouchableOpacity style={styles.icon} onPress={this._typeChange}>
              <Icon name="sync" color="white" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={this._flashChange}>
              {flash === Camera.Constants.FlashMode.off ? (
                <Icon name="flash-off" color="white" size={30} />
              ) : (
                <Icon name="flash-on" color="white" size={30} />
              )}
            </TouchableOpacity>
          </Camera>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={this._takeCamera}>
              <Text style={{ fontSize: 18, color: "black" }}>치즈~~</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  camera: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  icon: {
    backgroundColor: "transparent",
    height: 40,
    width: 40,
    margin: 10
  }
});
