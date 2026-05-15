import { useReducer } from 'react';
import { pickRandomCategories } from '../lib/categories';
import { fetchSessionImages, preloadImage } from '../lib/unsplash';
import { saveSession } from '../lib/storage';

const INITIAL_STATE = {
  phase: 'DASHBOARD',
  categories: [],
  images: [],
  targetIndex: null,
  selectedIndex: null,
  targetRefCode: '',
  imagesReady: false,
  hit: null,
  error: null
};

function generateTargetRefCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded ambiguous I, O, 1, 0
  let code = '';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...INITIAL_STATE,
        phase: 'RITUAL',
        categories: pickRandomCategories(4),
        targetRefCode: generateTargetRefCode(),
        targetIndex: Math.floor(Math.random() * 4)
      };
    case 'IMAGES_FETCHED':
      return {
        ...state,
        images: action.payload,
        imagesReady: true
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'RITUAL_COMPLETE':
      return { ...state, phase: 'BLIND' };
    case 'BLIND_COMPLETE':
      return { ...state, phase: 'JUDGING' };
    case 'SELECT_IMAGE': {
      const hit = action.payload === state.targetIndex;
      const sessionData = {
        timestamp: Date.now(),
        targetIndex: state.targetIndex,
        selectedIndex: action.payload,
        hit,
        categories: state.categories,
        targetRefCode: state.targetRefCode
      };
      saveSession(sessionData);
      
      return {
        ...state,
        phase: 'FEEDBACK',
        selectedIndex: action.payload,
        hit
      };
    }
    case 'RETURN_HOME':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useSessionMachine() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const startSession = () => {
    dispatch({ type: 'START_SESSION' });
  };

  const fetchImages = async (categories) => {
    try {
      const images = await fetchSessionImages(categories);
      // Preload images
      await Promise.all(images.map(img => preloadImage(img.urls.regular)));
      dispatch({ type: 'IMAGES_FETCHED', payload: images });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return [state, dispatch, { startSession, fetchImages }];
}
