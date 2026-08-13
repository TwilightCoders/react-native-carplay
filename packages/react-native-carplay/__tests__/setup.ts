// Mock setup for react-native-carplay package tests

// Mock React Native's NativeModules to avoid bridge dependency
jest.mock('react-native', () => ({
  NativeModules: {
    RNCarPlay: {
      // Core CarPlay functions
      presentTemplate: jest.fn(),
      pushTemplate: jest.fn(),
      popTemplate: jest.fn(),
      popToTemplate: jest.fn(),
      setRootTemplate: jest.fn(),
      
      // Connection management
      registerOnConnect: jest.fn(),
      registerOnDisconnect: jest.fn(),
      
      // Template-specific functions
      updateListTemplate: jest.fn(),
      updateGridTemplate: jest.fn(),
      updateMapTemplate: jest.fn(),
      updateInformationTemplate: jest.fn(),
      
      // Alert and action sheet functions
      presentAlert: jest.fn(),
      dismissAlert: jest.fn(),
      presentActionSheet: jest.fn(),
      dismissActionSheet: jest.fn(),
      
      // Voice control
      setVoiceControlStates: jest.fn(),
      
      // Trip functions
      startTrip: jest.fn(),
      finishTrip: jest.fn(),
      updateTravelEstimates: jest.fn(),
      
      // Now Playing
      updateNowPlayingTemplate: jest.fn(),
      
      // Search
      searchResultsWithItems: jest.fn(),
      
      // POI
      updatePointOfInterestTemplate: jest.fn(),
    }
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios || obj.default),
  },
  DeviceEventEmitter: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  },
  NativeEventEmitter: jest.fn(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
  })),
}));