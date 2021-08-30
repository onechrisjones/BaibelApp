import React, { Fragment } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/player';
import ProgressTimeLine from './ProgressTimeLine';
import Icon from '~/components/common/Icon';
import CONSTANTS from '~/utils/CONSTANTS';
import formatFileName from '~/utils/format-file-name';

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-right: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ContentWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const PodcastImage = styled(Image)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('15%')}px;
  border-radius: 3px;
`;

const PlayerButtonsWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TextContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
`;

const PodcastTitle = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const AuthorName = styled(Text).attrs({
  numberOfLines: 1,
})`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.2}px;
  color: ${({ theme }) => theme.colors.subTextColor};
`;

const PlayerIcon = styled(Icon).attrs(({ theme, size, name }) => ({
  color: theme.colors.textColor,
  size,
  name,
}))``;

const PlayerTracker = ({
  stopPlaying,
  activeAudio,
  category,
  navigation,
  playNext,
  paused,
  pause,
  play,
}) => {
  if (!activeAudio) {
    return null;
  }

  return (
    <Fragment>
      <ProgressTimeLine />
      <Wrapper>
        <TouchableHighlight
          onPress={() => {
            stopPlaying();
          }}
        >
          <Text style={{ color: 'white' }}>Stop</Text>
        </TouchableHighlight>
        <ContentWrapper
          onPress={() => navigation.navigate(CONSTANTS.ROUTES.PLAYER)}
        >
          <PodcastImage source={require('../../../../img/bible.jpg')} />
          <TextContentWrapper>
            <PodcastTitle>{category}</PodcastTitle>
            <AuthorName>{formatFileName(activeAudio)}</AuthorName>
          </TextContentWrapper>
        </ContentWrapper>
        <PlayerButtonsWrapper>
          <TouchableOpacity
            onPress={() => (paused ? play() : pause())}
            style={{
              marginHorizontal: 4,
            }}
          >
            <PlayerIcon
              name={paused ? 'play-circle' : 'pause-circle'}
              size={36}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNext}>
            <PlayerIcon name="skip-next" size={28} />
          </TouchableOpacity>
        </PlayerButtonsWrapper>
      </Wrapper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  activeAudio: state.player.activeAudio,
  shouldShowTimeline: state.player.shouldShowTimeline,
  category: state.player.category,
  paused: state.player.paused,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTracker);
