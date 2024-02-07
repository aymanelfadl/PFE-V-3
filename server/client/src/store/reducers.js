import { combineReducers } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL, SAVE_CHANGES } from './actions';

const initialModalState = {
  open: false,
  selectedProduct: null,
};

const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
      };
    case SAVE_CHANGES:
      return {
        ...state,
        open: false,
        selectedProduct: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  modal: modalReducer,
});

export default rootReducer;
