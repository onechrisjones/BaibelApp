import React, { Component } from 'react';
import { View, Text, Slider } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import appStyles from '~/styles';
import { parseCurrentTime } from '~/store/player';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  padding-horizontal: 20px;
`;

const TimerWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TimerText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

class ProgressSlider extends Component {
  state = {
    isSliding: false,
    slideValue: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { player } = nextProps;
    const { shouldSeekProgressSlider, currentTime } = player;

    const { isSliding } = this.state;

    if (isSliding || shouldSeekProgressSlider) {
      return;
    }

    const rawMinutes = currentTime.split(':')[0];
    const rawSeconds = currentTime.split(':')[1];

    const minutes = parseInt(rawMinutes, 10);
    const seconds = parseInt(rawSeconds, 10);

    const currentTimeInSeconds = minutes * 60 + seconds;

    this.setState({
      slideValue: currentTimeInSeconds,
    });
  }

  onSlidingComplete = slideValue => {
    const { seekActiveAudio } = this.props;

    this.setState({ isSliding: false, slideValue }, () =>
      seekActiveAudio(slideValue),
    );
  };

  onValueChange = slideValue => {
    this.setState({
      isSliding: true,
      slideValue,
    });
  };

  render() {
    const { slideValue } = this.state;
    const { player } = this.props;
    const { duration, currentTime } = player;

    return (
      <Wrapper>
        <Slider
          onSlidingComplete={value => this.onSlidingComplete(value)}
          minimumTrackTintColor={appStyles.colors.primaryColor}
          maximumTrackTintColor={appStyles.colors.subTextWhite}
          onValueChange={value => this.onValueChange(value)}
          thumbTintColor={appStyles.colors.primaryColor}
          maximumValue={duration}
          value={slideValue}
          minimumValue={0}
          step={1}
        />
        <TimerWrapper>
          <TimerText>{currentTime}</TimerText>
          <TimerText>{parseCurrentTime(duration)}</TimerText>
        </TimerWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(ProgressSlider);
