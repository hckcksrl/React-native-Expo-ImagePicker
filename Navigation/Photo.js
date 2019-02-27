import React, { Component } from "react";
import { View, Text, CameraRoll } from "react-native";
import { Library } from "./Library";
import PropTypes from "prop-types";

class Photo extends Component {
  constructor() {
    super();
    this.state = {
      images: null,
      pickphotos: null,
      loading: true
    };
  }

  componentWillMount = async () => {
    const { groupTypes } = this.props;
    const { edges } = await CameraRoll.getPhotos({
      first: 100,
      groupTypes: groupTypes,
      assetType: "Photos"
    });
    this.setState({
      images: edges,
      pickphotos: edges[0],
      loading: false
    });
  };

  render() {
    if (this.state.loading === false) {
      return <Library {...this.state} />;
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading</Text>
        </View>
      );
    }
  }
}

Photo.propTypes = {
  groupTypes: PropTypes.oneOf([
    "Album",
    "All",
    "Event",
    "Faces",
    "Library",
    "PhotoStream",
    "SavedPhotos"
  ])
};

export default Photo;
