import React, { Component } from 'react';
import Sound from 'react-native-video';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/player';

class SoundComponent extends Component {
  soundRef = null;

  componentWillReceiveProps(nextProps) {
    const { player, seekActiveAudio } = nextProps;
    const { seekValue } = player;

    if (seekValue) {
      this.soundRef.seek(seekValue, 50);
      seekActiveAudio(0);
    }
  }

  onEnd = () => {
    const { playNext } = this.props;
    playNext();
  };

  render() {
    const { setCurrentTime, setDuration, player } = this.props;
    const { paused, activeAudio } = player;
    return (
      !!activeAudio && (
        <Sound
          onProgress={({ currentTime }) => {
            if (!paused) {
              setCurrentTime(currentTime);
            }
          }}
          onLoad={vid => {
            setDuration(vid.duration);
          }}
          onEnd={this.onEnd}
          source={{
            uri: activeAudio.replace('.mp3', ''),
          }}
          ref={ref => {
            this.soundRef = ref;
          }}
          repeat={false}
          playInBackground
          paused={paused}
          rate={1.0}
          audioOnly
        />
      )
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(SoundComponent);
