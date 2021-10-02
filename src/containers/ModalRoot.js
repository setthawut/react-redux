import React from "react";
import { connect } from "react-redux";

import {
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
  OPEN_RESET_PASSWORD_MODAL,
  OPEN_VIEW_ROLE_MODAL,
  OPEN_CREATE_ROLE_MODAL,
  OPEN_EDIT_ROLE_MODAL,
  OPEN_DETAIL_USER_MODAL,
  OPEN_CREATE_USER_MODAL,
  OPEN_EDIT_USER_MODAL,
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
} from "../redux/actions/types";

import CreatNewsModal from "./News/CreateNewsModal";
import DetailNewsModal from "./News/DetailNewsModal";
import EditNewsModal from "./News/EditNewsModal";

import CreateMeetingModal from "./Meeting/CreateMeetingModal";
import DetailMeetingModal from "./Meeting/DetailMeetingModal";
import EditMeetingModal from "./Meeting/EditMeetingModal";

import CreateNotifyModal from "./Notify/CreateNotifyModal";
import DetailNotifyModal from "./Notify/DetailNotifyModal";
import EditNotifyModal from "./Notify/EditNotifyModal";

import CreateAppealModal from "./Appeal/CreateAppealModal";
import EditAppealModal from "./Appeal/EditAppealModal";
import DetailAppeal from "./Appeal/DetailAppealModal";

import CreateQualifiedPersonModal from "./QualifiedPerson/CreateQualifiedPersonModal";
import EditQualifiedPersonModal from "./QualifiedPerson/EditQualifiedPersonModal";
import DetailQualifiedPersonModal from "./QualifiedPerson/DetailQualifiedPersonModal";

import CreateDefendantModal from "./Defendant/CreateDefendantModal";
import DetailDefendantModal from "./Defendant/DetailDefendantModal";
import EditDefendantModal from "./Defendant/EditDefendantModal";

import CreateLawModal from "./Law/CreateLawModal";
import DetailLawModal from "./Law/DetailLawModal";
import EditLawModal from "./Law/EditLawModal";

import CreateUserModal from "./User/CreateUserModal";
import DetailUserModal from "./User/DetailUserModal";
import EditUserModal from "./User/EditUserModal";

import CreateBannerModal from "./Setting/Banner/CreateBannerModal";
import DetailBannerModal from "./Setting/Banner/DetailBannerModal";
import EditBannerModal from "./Setting/Banner/EditBannerModal";

import ResetPasswordModal from "./User/ResetPasswordModal";
const MODAL_COMPONENTS = {
  OPEN_CREATE_NEWS_MODAL: CreatNewsModal,
  OPEN_DETAIL_NEWS_MODAL: DetailNewsModal,
  OPEN_EDIT_NEWS_MODAL: EditNewsModal,

  OPEN_DETAIL_MEETING_MODAL: DetailMeetingModal,
  OPEN_CREATE_MEETING_MODAL: CreateMeetingModal,
  OPEN_EDIT_MEETING_MODAL: EditMeetingModal,

  OPEN_DETAIL_NOTIFY_MODAL: DetailNotifyModal,
  OPEN_CREATE_NOTIFY_MODAL: CreateNotifyModal,
  OPEN_EDIT_NOTIFY_MODAL: EditNotifyModal,

  OPEN_CREATE_APPEAL_MODAL: CreateAppealModal,
  OPEN_EDIT_APPEAL_MODAL: EditAppealModal,
  OPEN_DETAIL_APPEAL_MODAL: DetailAppeal,

  OPEN_DETAIL_QUALIFIEDPERSON_MODAL: DetailQualifiedPersonModal,
  OPEN_CREATE_QUALIFIEDPERSON_MODAL: CreateQualifiedPersonModal,
  OPEN_EDIT_QUALIFIEDPERSON_MODAL: EditQualifiedPersonModal,

  OPEN_DETAIL_DEFENDANT_MODAL: DetailDefendantModal,
  OPEN_CREATE_DEFENDANT_MODAL: CreateDefendantModal,
  OPEN_EDIT_DEFENDANT_MODAL: EditDefendantModal,

  OPEN_DETAIL_LAW_MODAL: DetailLawModal,
  OPEN_CREATE_LAW_MODAL: CreateLawModal,
  OPEN_EDIT_LAW_MODAL: EditLawModal,

  OPEN_CREATE_USER_MODAL: CreateUserModal,
  OPEN_DETAIL_USER_MODAL: DetailUserModal,
  OPEN_EDIT_USER_MODAL: EditUserModal,

  OPEN_CREATE_BANNER_MODAL: CreateBannerModal,
  OPEN_DETAIL_BANNER_MODAL: DetailBannerModal,
  OPEN_EDIT_BANNER_MODAL: EditBannerModal,

  OPEN_RESET_PASSWORD_MODAL: ResetPasswordModal,
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} />;
};

export default connect((state) => state.modal)(ModalRoot);
