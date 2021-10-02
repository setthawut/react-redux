import {
  OPEN_DETAIL_USER_MODAL,
  OPEN_CREATE_USER_MODAL,
  OPEN_EDIT_USER_MODAL,
  OPEN_RESET_PASSWORD_MODAL,
  OPEN_VIEW_ROLE_MODAL,
  OPEN_CREATE_ROLE_MODAL,
  OPEN_EDIT_ROLE_MODAL,
  HIDE_MODAL,
  OPEN_DETAIL_MEETING_MODAL,
  OPEN_CREATE_MEETING_MODAL,
  OPEN_EDIT_MEETING_MODAL,
  OPEN_DETAIL_NOTIFY_MODAL,
  OPEN_CREATE_NOTIFY_MODAL,
  OPEN_EDIT_NOTIFY_MODAL,
  OPEN_DETAIL_APPEAL_MODAL,
  OPEN_CREATE_APPEAL_MODAL,
  OPEN_EDIT_APPEAL_MODAL,
  OPEN_DETAIL_LAW_MODAL,
  OPEN_CREATE_LAW_MODAL,
  OPEN_EDIT_LAW_MODAL,
  OPEN_HISTORY_DETAIL_MODAL,
  OPEN_CREATE_HISTORY_MODAL,
  OPEN_EDIT_HISTORY_MODAL,
  OPEN_DETAIL_NEWS_MODAL,
  OPEN_CREATE_NEWS_MODAL,
  OPEN_EDIT_NEWS_MODAL,
  OPEN_DETAIL_BANNER_MODAL,
  OPEN_CREATE_BANNER_MODAL,
  OPEN_EDIT_BANNER_MODAL,
  OPEN_DETAIL_QUALIFIEDPERSON_MODAL,
  OPEN_CREATE_QUALIFIEDPERSON_MODAL,
  OPEN_EDIT_QUALIFIEDPERSON_MODAL,
  OPEN_DETAIL_DEFENDANT_MODAL,
  OPEN_CREATE_DEFENDANT_MODAL,
  OPEN_EDIT_DEFENDANT_MODAL,
} from "./types";

// News
export function showNewsDetail(value) {
  return {
    type: OPEN_DETAIL_NEWS_MODAL,
    payload: value,
  };
}
export function showCreateNews() {
  return {
    type: OPEN_CREATE_NEWS_MODAL,
  };
}
export function showEditNews(server) {
  return {
    type: OPEN_EDIT_NEWS_MODAL,
    payload: server,
  };
}

// Meeting
export function showMeetingDetail(value) {
  return {
    type: OPEN_DETAIL_MEETING_MODAL,
    payload: value,
  };
}
export function showCreateMeeting() {
  return {
    type: OPEN_CREATE_MEETING_MODAL,
  };
}
export function showEditMeeting(server) {
  return {
    type: OPEN_EDIT_MEETING_MODAL,
    payload: server,
  };
}

// Notify
export function showNotifyDetail(value) {
  return {
    type: OPEN_DETAIL_NOTIFY_MODAL,
    payload: value,
  };
}
export function showCreateNotify() {
  return {
    type: OPEN_CREATE_NOTIFY_MODAL,
  };
}
export function showEditNotify(server) {
  return {
    type: OPEN_EDIT_NOTIFY_MODAL,
    payload: server,
  };
}

// Appeal
export function showAppealDetail(value) {
  return {
    type: OPEN_DETAIL_APPEAL_MODAL,
    payload: value,
  };
}
export function showCreateAppeal() {
  return {
    type: OPEN_CREATE_APPEAL_MODAL,
  };
}
export function showEditAppeal(server) {
  return {
    type: OPEN_EDIT_APPEAL_MODAL,
    payload: server,
  };
}

// QualifiedPerson
export function showQualifiedPersonDetail(value) {
  return {
    type: OPEN_DETAIL_QUALIFIEDPERSON_MODAL,
    payload: value,
  };
}
export function showCreateQualifiedPerson() {
  return {
    type: OPEN_CREATE_QUALIFIEDPERSON_MODAL,
  };
}
export function showEditQualifiedPerson(server) {
  return {
    type: OPEN_EDIT_QUALIFIEDPERSON_MODAL,
    payload: server,
  };
}

// Defendant
export function showDefendantDetail(value) {
  return {
    type: OPEN_DETAIL_DEFENDANT_MODAL,
    payload: value,
  };
}
export function showCreateDefendant() {
  return {
    type: OPEN_CREATE_DEFENDANT_MODAL,
  };
}
export function showEditDefendant(server) {
  return {
    type: OPEN_EDIT_DEFENDANT_MODAL,
    payload: server,
  };
}

// Law
export function showLawDetail(value) {
  return {
    type: OPEN_DETAIL_LAW_MODAL,
    payload: value,
  };
}
export function showCreateLaw() {
  return {
    type: OPEN_CREATE_LAW_MODAL,
  };
}
export function showEditLaw(server) {
  return {
    type: OPEN_EDIT_LAW_MODAL,
    payload: server,
  };
}

// BANNER
export function showBannerDetail(value) {
  return {
    type: OPEN_DETAIL_BANNER_MODAL,
    payload: value,
  };
}
export function showCreateBanner() {
  return {
    type: OPEN_CREATE_BANNER_MODAL,
  };
}
export function showEditBanner(value) {
  return {
    type: OPEN_EDIT_BANNER_MODAL,
    payload: value,
  };
}

// History
export function showHistoryDetail(value) {
  return {
    type: OPEN_HISTORY_DETAIL_MODAL,
    payload: value,
  };
}
export function showCreateHistory() {
  return {
    type: OPEN_CREATE_HISTORY_MODAL,
  };
}
export function showEditHistory(server) {
  return {
    type: OPEN_EDIT_HISTORY_MODAL,
    payload: server,
  };
}

// User
export function showUserDetail(value) {
  return {
    type: OPEN_DETAIL_USER_MODAL,
    payload: value,
  };
}

export function showCreateUser() {
  return {
    type: OPEN_CREATE_USER_MODAL,
  };
}
export function showEditUser(user) {
  return {
    type: OPEN_EDIT_USER_MODAL,
    payload: user,
  };
}
export function showResetPassword(user) {
  return {
    type: OPEN_RESET_PASSWORD_MODAL,
    payload: user,
  };
}

// Role
export function showViewRole(role) {
  return {
    type: OPEN_VIEW_ROLE_MODAL,
    payload: role,
  };
}
export function showCreateRole() {
  return {
    type: OPEN_CREATE_ROLE_MODAL,
  };
}
export function showEditRole(role) {
  return {
    type: OPEN_EDIT_ROLE_MODAL,
    payload: role,
  };
}

// Hide Modal
export function hide_modal() {
  return {
    type: HIDE_MODAL,
  };
}
