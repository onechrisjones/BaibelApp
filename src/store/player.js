import { last } from 'lodash';

export const Types = {
  SET_ACTIVE_AUDIO: 'SET_ACTIVE_AUDIO',
  PLAY_NEXT: 'PLAY_NEXT',
  PLAY_PREV: 'PLAY_PREV',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  PLAY: 'PLAY',
  STOP: 'STOP',
  SET_DURATION: 'SET_DURATION',
  SEEK_ACTIVE_AUDIO: 'SEEK_ACTIVE_AUDIO',
  STOP_PLAYING: 'STOP_PLAYING',
};

const INITIAL_STATE = {
  currentTime: '00:00',
  paused: true,
  activeAudio: '',
  duration: 0,
  seekValue: 0,
  category: '',
  activePlayList: [],
};

export const Creators = {
  setActiveAudio: payload => ({
    type: Types.SET_ACTIVE_AUDIO,
    payload,
  }),

  seekActiveAudio: payload => ({
    type: Types.SEEK_ACTIVE_AUDIO,
    payload,
  }),

  playNext: () => {
    return {
      type: Types.PLAY_NEXT,
    };
  },

  playPrevious: () => {
    return {
      type: Types.PLAY_PREV,
    };
  },

  setCurrentTime: payload => ({
    type: Types.SET_CURRENT_TIME,
    payload,
  }),

  setDuration: payload => ({
    type: Types.SET_DURATION,
    payload,
  }),

  play: () => ({
    type: Types.PLAY,
  }),

  pause: () => ({
    type: Types.STOP,
  }),

  stopPlaying: () => ({
    type: Types.STOP_PLAYING,
  }),
};

export const parseCurrentTime = rawTime => {
  const currentTime = Math.ceil(rawTime);

  const currentTimeInMinutes = Math.floor(currentTime / 60);
  const currentTimeInSeconds = currentTime % 60;

  let minutes = '00';
  let seconds = '00';

  if (currentTimeInMinutes > 9) {
    minutes = currentTimeInMinutes;
  }

  if (currentTimeInMinutes >= 1 && currentTimeInMinutes <= 9) {
    minutes = `0${currentTimeInMinutes}`;
  }

  if (currentTimeInSeconds > 9 && currentTimeInSeconds <= 59) {
    seconds = currentTimeInSeconds;
  }

  if (currentTimeInSeconds >= 1 && currentTimeInSeconds <= 9) {
    seconds = `0${currentTimeInSeconds}`;
  }

  if (currentTimeInSeconds === 60) {
    seconds = '00';
  }

  return `${minutes}:${seconds}`;
};

const getActiveIndex = state =>
  state.activePlayList.findIndex(item => item.name === state.activeAudio);

const getNextItem = state => {
  const activeIndex = getActiveIndex(state);
  const nextItem = state.activePlayList[activeIndex + 1];

  const activeAudio = nextItem ? nextItem.name : state.activePlayList[0].name;

  return { ...state, activeAudio };
};

const getPrevItem = state => {
  const activeIndex = getActiveIndex(state);
  const prevItem = state.activePlayList[activeIndex - 1];

  const activeAudio = prevItem
    ? prevItem.name
    : last(state.activePlayList).name;

  return { ...state, activeAudio };
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.SET_DURATION:
      return {
        ...state,
        duration: payload,
      };

    case Types.SET_ACTIVE_AUDIO:
      return {
        ...state,
        shouldShowTimeline: true,
        activeAudio: payload.activeAudio,
        category: payload.category.replace('/listen//', ''),
        paused: false,
        activePlayList: payload.activePlayList,
      };

    case Types.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: parseCurrentTime(payload),
      };

    case Types.SEEK_ACTIVE_AUDIO:
      return {
        ...state,
        seekValue: payload,
      };

    case Types.PLAY:
      return {
        ...state,
        stopPlayer: false,
        paused: false,
      };

    case Types.PLAY_NEXT:
      return getNextItem(state);

    case Types.PLAY_PREV:
      return getPrevItem(state);

    case Types.STOP:
      return {
        ...state,
        paused: true,
      };

    case Types.STOP_PLAYING:
      return {
        ...state,
        activeAudio: null,
      };

    default:
      return state;
  }
};

export default player;
