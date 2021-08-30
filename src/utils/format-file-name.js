import { startCase } from 'lodash';

const formatFileName = text => {
  return startCase(text.replace('.mp3', '').replace('audio_', ''));
};

export default formatFileName;
