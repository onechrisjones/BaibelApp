import React, { Component, Fragment } from 'react';
import { Animated } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/player';
import PlayerComponent from './components/PlayerComponent';

class Player extends Component {
  darkLayerOpacity = new Animated.Value(0);

  setDarkLayerOpacity = () => {
    Animated.timing(this.darkLayerOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      seekActiveAudio,
      activeAudio,
      playPrevious,
      playNext,
      category,
      paused,
      pause,
      play,
    } = this.props;

    return (
      <Fragment>
        {!!activeAudio && (
          <PlayerComponent
            category={category}
            seekActiveAudio={seekActiveAudio}
            activeAudio={activeAudio}
            playPrevious={playPrevious}
            playNext={playNext}
            paused={paused}
            pause={pause}
            play={play}
          />
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  activeAudio: state.player.activeAudio,
  activePlaylist: state.player.activePlayList,
  category: state.player.category,
  paused: state.player.paused,
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
