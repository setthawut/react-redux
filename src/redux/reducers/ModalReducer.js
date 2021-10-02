import {
  OPEN_DETAIL_NEWS_MODAL,
  OPEN_CREATE_NEWS_MODAL,
  OPEN_EDIT_NEWS_MODAL,
  OPEN_DETAIL_MEETING_MODAL,
  OPEN_CREATE_MEETING_MODAL,
  OPEN_EDIT_MEETING_MODAL,
  OPEN_CREATE_USER_MODAL,
  OPEN_EDIT_USER_MODAL,
  OPEN_DETAIL_USER_MODAL,
  OPEN_RESET_PASSWORD_MODAL,
  OPEN_VIEW_ROLE_MODAL,
  OPEN_CREATE_ROLE_MODAL,
  OPEN_EDIT_ROLE_MODAL,
  OPEN_DETAIL_NOTIFY_MODAL,
  OPEN_CREATE_NOTIFY_MODAL,
  OPEN_EDIT_NOTIFY_MODAL,
  OPEN_DETAIL_APPEAL_MODAL,
  OPEN_CREATE_APPEAL_MODAL,
  OPEN_EDIT_APPEAL_MODAL,
  OPEN_DETAIL_LAW_MODAL,
  OPEN_CREATE_LAW_MODAL,
  OPEN_EDIT_LAW_MODAL,
  OPEN_DETAIL_BANNER_MODAL,
  OPEN_CREATE_BANNER_MODAL,
  OPEN_EDIT_BANNER_MODAL,
  OPEN_HISTORY_DETAIL_MODAL,
  OPEN_CREATE_HISTORY_MODAL,
  OPEN_EDIT_HISTORY_MODAL,
  OPEN_DETAIL_QUALIFIEDPERSON_MODAL,
  OPEN_CREATE_QUALIFIEDPERSON_MODAL,
  OPEN_EDIT_QUALIFIEDPERSON_MODAL,
  OPEN_DETAIL_DEFENDANT_MODAL,
  OPEN_CREATE_DEFENDANT_MODAL,
  OPEN_EDIT_DEFENDANT_MODAL,
  HIDE_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  modalType: null,
  modalProps: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // News
    case OPEN_DETAIL_NEWS_MODAL:
      return {
        modalType: OPEN_DETAIL_NEWS_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_NEWS_MODAL:
      return {
        modalType: OPEN_CREATE_NEWS_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_NEWS_MODAL:
      return {
        modalType: OPEN_EDIT_NEWS_MODAL,
        modalProps: action.payload,
      };

    // Meeting
    case OPEN_DETAIL_MEETING_MODAL:
      return {
        modalType: OPEN_DETAIL_MEETING_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_MEETING_MODAL:
      return {
        modalType: OPEN_CREATE_MEETING_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_MEETING_MODAL:
      return {
        modalType: OPEN_EDIT_MEETING_MODAL,
        modalProps: action.payload,
      };

    // Notify
    case OPEN_DETAIL_NOTIFY_MODAL:
      return {
        modalType: OPEN_DETAIL_NOTIFY_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_NOTIFY_MODAL:
      return {
        modalType: OPEN_CREATE_NOTIFY_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_NOTIFY_MODAL:
      return {
        modalType: OPEN_EDIT_NOTIFY_MODAL,
        modalProps: action.payload,
      };

    // Appeal
    case OPEN_DETAIL_APPEAL_MODAL:
      return {
        modalType: OPEN_DETAIL_APPEAL_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_APPEAL_MODAL:
      return {
        modalType: OPEN_CREATE_APPEAL_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_APPEAL_MODAL:
      return {
        modalType: OPEN_EDIT_APPEAL_MODAL,
        modalProps: action.payload,
      };

    // QUALIFIEDPERSON
    case OPEN_DETAIL_QUALIFIEDPERSON_MODAL:
      return {
        modalType: OPEN_DETAIL_QUALIFIEDPERSON_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_QUALIFIEDPERSON_MODAL:
      return {
        modalType: OPEN_CREATE_QUALIFIEDPERSON_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_QUALIFIEDPERSON_MODAL:
      return {
        modalType: OPEN_EDIT_QUALIFIEDPERSON_MODAL,
        modalProps: action.payload,
      };

    // DEFENDANT
    case OPEN_DETAIL_DEFENDANT_MODAL:
      return {
        modalType: OPEN_DETAIL_DEFENDANT_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_DEFENDANT_MODAL:
      return {
        modalType: OPEN_CREATE_DEFENDANT_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_DEFENDANT_MODAL:
      return {
        modalType: OPEN_EDIT_DEFENDANT_MODAL,
        modalProps: action.payload,
      };

    // Law
    case OPEN_DETAIL_LAW_MODAL:
      return {
        modalType: OPEN_DETAIL_LAW_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_LAW_MODAL:
      return {
        modalType: OPEN_CREATE_LAW_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_LAW_MODAL:
      return {
        modalType: OPEN_EDIT_LAW_MODAL,
        modalProps: action.payload,
      };

    // BANNER
    case OPEN_DETAIL_BANNER_MODAL:
      return {
        modalType: OPEN_DETAIL_BANNER_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_BANNER_MODAL:
      return {
        modalType: OPEN_CREATE_BANNER_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_BANNER_MODAL:
      return {
        modalType: OPEN_EDIT_BANNER_MODAL,
        modalProps: action.payload,
      };

    // HISTORY
    case OPEN_HISTORY_DETAIL_MODAL:
      return {
        modalType: OPEN_HISTORY_DETAIL_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_HISTORY_MODAL:
      return {
        modalType: OPEN_CREATE_HISTORY_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_HISTORY_MODAL:
      return {
        modalType: OPEN_EDIT_HISTORY_MODAL,
        modalProps: action.payload,
      };

    // User

    case OPEN_DETAIL_USER_MODAL:
      return {
        modalType: OPEN_DETAIL_USER_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_USER_MODAL:
      return {
        modalType: OPEN_CREATE_USER_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_USER_MODAL:
      return {
        modalType: OPEN_EDIT_USER_MODAL,
        modalProps: action.payload,
      };
    case OPEN_RESET_PASSWORD_MODAL:
      return {
        modalType: OPEN_RESET_PASSWORD_MODAL,
        modalProps: action.payload,
      };

    // Role
    case OPEN_VIEW_ROLE_MODAL:
      return {
        modalType: OPEN_VIEW_ROLE_MODAL,
        modalProps: action.payload,
      };
    case OPEN_CREATE_ROLE_MODAL:
      return {
        modalType: OPEN_CREATE_ROLE_MODAL,
        modalProps: action.payload,
      };
    case OPEN_EDIT_ROLE_MODAL:
      return {
        modalType: OPEN_EDIT_ROLE_MODAL,
        modalProps: action.payload,
      };

    case HIDE_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
