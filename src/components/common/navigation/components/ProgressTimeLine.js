import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import appStyles from '~/styles';

const TotalDurationLine = styled(View)`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.subTextWhite};
  position: absolute;
`;

const CurrentTimeLine = styled(View)`
  width: ${({ width }) => `${width}px`};
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const getTotalSecondsFromCurrentTime = currentTime => {
  const rawMinutes = currentTime.split(':')[0];
  const rawSeconds = currentTime.split(':')[1];

  const minutes = parseInt(rawMinutes, 10);
  const seconds = parseInt(rawSeconds, 10);

  const currentTimeInSeconds = minutes * 60 + seconds;

  return currentTimeInSeconds;
};

const getCurrentTimeLineWidth = (durationInSeconds, currentTime) => {
  const currentTimeInSeconds = getTotalSecondsFromCurrentTime(currentTime);
  const screenWidth = appStyles.metrics.width;

  const currentTimeLineWidth =
    (currentTimeInSeconds * screenWidth) / durationInSeconds;

  return currentTimeLineWidth;
};

const ProgressTimeLine = ({ duration, currentTime = '00:00' }) => {
  const currentTimeLineWidth =
    getCurrentTimeLineWidth(duration, currentTime) || 0;
  return (
    <View>
      <TotalDurationLine />
      <CurrentTimeLine width={currentTimeLineWidth} />
    </View>
  );
};

const mapStateToProps = state => ({
  duration: state.player.duration,
  currentTime: state.player.currentTime,
});

export default connect(mapStateToProps)(ProgressTimeLine);
