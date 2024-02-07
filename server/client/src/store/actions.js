export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SAVE_CHANGES = 'SAVE_CHANGES';

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const saveChanges = (product) => ({
  type: SAVE_CHANGES,
  payload: product,
});
