import * as Tone from 'tone';

class MusicElementFactory {
    static createElement(type, options) {
      switch (type) {
        case 'synth':
          return new Tone.Synth(options).toDestination();
        case 'drum':
          return new Tone.MembraneSynth(options).toDestination();
        case 'effect':
          return new Tone.Effect(options);
        default:
          throw new Error('Unknown element type');
      }
    }
  }

  class MusicContext {
    constructor() {
      if (!MusicContext.instance) {
        this.transport = Tone.Transport;
        MusicContext.instance = this;
      }
      return MusicContext.instance;
    }
  }
  const musicContext = new MusicContext();
  Object.freeze(musicContext);

  class MusicComposition {
    constructor() {
      this.tracks = [];
    }
  
    addTrack(track) {
      this.tracks.push(track);
    }
  
    start() {
      this.tracks.forEach(track => track.start());
    }
  
    stop() {
      this.tracks.forEach(track => track.stop());
    }
  }

  class EffectDecorator {
    constructor(track, effect) {
      this.track = track;
      this.effect = effect;
      this.track.connect(this.effect);
      this.effect.toDestination();
    }
  
    start() {
      this.track.start();
    }
  
    stop() {
      this.track.stop();
    }
  }

  class MusicPlayerFacade {
    constructor() {
      this.composition = new MusicComposition();
    }
  
    addTrack(track) {
      this.composition.addTrack(track);
    }
  
    start() {
      Tone.Transport.start();
      this.composition.start();
    }
  
    stop() {
      Tone.Transport.stop();
      this.composition.stop();
    }
  }

  class EventManager {
    constructor() {
      this.listeners = [];
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
    }
  
    notify(event) {
      this.listeners.forEach(listener => listener.update(event));
    }
  }

  class UserActionCommand {
    constructor(action, target) {
      this.action = action;
      this.target = target;
    }
  
    execute() {
      this.target[this.action]();
    }
  }

  class PatternStrategy {
    constructor(strategy) {
      this.strategy = strategy;
    }
  
    generatePattern() {
      return this.strategy.generate();
    }
  }
  
  class RandomPattern {
    generate() {
      return Math.random() * 100; // Simple example
    }
  }
  
  class AlgorithmicPattern {
    generate() {
      return Math.sin(Tone.now()); // Another simple example
    }
  }
  