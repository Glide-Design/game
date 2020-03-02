import { advanceBy, advanceTo } from 'jest-date-mock';
import VideoPlaybackSession from './VideoPlaybackSession';
import {
  dispatchVideoPlaybackStarted,
  // dispatchVideoPlaybackPaused,
  // dispatchVideoPlaybackResumed,
  dispatchVideoPlaybackEnded,
  dispatchVideoPlaybackProgress,
} from './actions';

describe('VideoPlaybackSession', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('play()', () => {
    it('dispatches a play event', () => {
      const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');

      playbackSession.play();

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackStarted('content-id'));
    });

    it('dispatches a play event for first play only', () => {
      const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');

      playbackSession.play();
      playbackSession.play();
      playbackSession.play();

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackStarted('content-id'));
    });
  });

  describe('progress()', () => {
    it('dispatches progress events for 25%, 50%, 75%, 95%', () => {
      const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');

      playbackSession.progress({ isAdvert: false, currentTime: 25, duration: 100 });
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.25));
      playbackSession.progress({ isAdvert: false, currentTime: 50, duration: 100 });
      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.5));
      playbackSession.progress({ isAdvert: false, currentTime: 75, duration: 100 });
      expect(dispatch).toBeCalledTimes(3);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.75));
      playbackSession.progress({ isAdvert: false, currentTime: 95, duration: 100 });
      expect(dispatch).toBeCalledTimes(4);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.95));
    });

    it('dispatches progress events once per percentage', () => {
      const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');

      playbackSession.progress({ isAdvert: false, currentTime: 20, duration: 100 });
      expect(dispatch).toBeCalledTimes(0);
      playbackSession.progress({ isAdvert: false, currentTime: 25, duration: 100 });
      expect(dispatch).toBeCalledTimes(1);
      playbackSession.progress({ isAdvert: false, currentTime: 30, duration: 100 });
      expect(dispatch).toBeCalledTimes(1);
    });

    it('dispatches missing progress events when jumping', () => {
      const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');

      playbackSession.progress({ isAdvert: false, currentTime: 100, duration: 100 });
      expect(dispatch).toBeCalledTimes(4);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.25));
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.5));
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.75));
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackProgress('content-id', 0.95));
    });

    it('does not dispatch progress events for adverts', () => {
      const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');

      playbackSession.progress({ isAdvert: true, currentTime: 100, duration: 100 });
      expect(dispatch).toBeCalledTimes(0);
    });
  });

  describe('end()', () => {
    it('dispatches an end event', () => {
      const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');

      playbackSession.end();
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(dispatchVideoPlaybackEnded('content-id', 0));
    });

    describe('Tracking time spent paused', () => {
      beforeEach(() => {
        advanceTo(new Date());
      });

      it('includes the time spent paused in the `dispatchVideoPlaybackEnded` action', () => {
        const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');
        const pauseDuration = 1001;
        const playDuration = 2002;

        playbackSession.play();
        advanceBy(playDuration);
        playbackSession.pause();
        advanceBy(pauseDuration);
        playbackSession.play();
        advanceBy(playDuration);
        playbackSession.pause();
        advanceBy(pauseDuration);
        playbackSession.play();
        playbackSession.end();

        expect(dispatch).toBeCalledWith(
          dispatchVideoPlaybackEnded('content-id', (2 * pauseDuration) / 1000)
        );
      });

      it('is unaffected by calling pause() multiple times', () => {
        const playbackSession = new VideoPlaybackSession(dispatch, 'content-id');
        const pauseDuration = 1001;
        const playDuration = 2002;

        playbackSession.play();
        advanceBy(playDuration);
        playbackSession.pause();
        playbackSession.pause();
        advanceBy(pauseDuration);
        playbackSession.pause();
        playbackSession.pause();
        playbackSession.play();
        playbackSession.end();

        expect(dispatch).toBeCalledWith(
          dispatchVideoPlaybackEnded('content-id', pauseDuration / 1000)
        );
      });
    });
  });
});
