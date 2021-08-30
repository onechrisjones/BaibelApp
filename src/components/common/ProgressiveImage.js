import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';

const ForegroundLayer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.progressiveImageForeground};
`;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },

  imageOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

class ProgressiveImage extends Component {
  thumbnailOpacity = new Animated.Value(0);

  imageOpacity = new Animated.Value(0);

  onThumbnailLoaded = () => {
    Animated.timing(this.thumbnailOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  onImageLoaded = () => {
    Animated.timing(this.imageOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <ForegroundLayer>
        <Animated.Image
          style={[
            styles.container,
            {
              opacity: this.thumbnailOpacity,
            },
          ]}
          source={require('../../img/listen-background.jpg')}
          onLoad={this.onThumbnailLoaded}
          blurRadius={1}
          resize="cover"
        />
        <Animated.Image
          style={[
            styles.imageOverlay,
            {
              opacity: this.imageOpacity,
            },
            styles.container,
          ]}
          onLoad={this.onImageLoaded}
          source={require('../../img/listen-background.jpg')}
          resize="cover"
        />
      </ForegroundLayer>
    );
  }
}

export default ProgressiveImage;
