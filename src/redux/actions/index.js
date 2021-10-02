import * as address from "./AddressAction";
import * as appeal from "./AppealAction";
import * as banner from "./BannerAction";
import * as changePasswordMe from "./ChangePasswordMeActions";
import * as dashboard from "./DashboardActions";
import * as history from "./HistoryAction";
import * as law from "./LawAction";
import * as loading from "./LoadingActions";
import * as login from "./LoginActions";
import * as meeting from "./MeetingAction";
import * as modal from "./ModalActions";
import * as news from "./NewsAction";
import * as qualifiedPerson from "./QualifiedPersonAction";
import * as defendant from "./DefendantAction";
import * as notify from "./NotifyAction";
import * as propose from "./ProposeAction";
import * as aboutUs from "./AboutUsAction";
import * as configuration from "./ConfigurationAction";
import * as publicFile from "./PublicFileAction";
import * as officeOfQualification from "./OfficeOfQualificationAction";
import * as user from "./UserActions";

export const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) =>
      dispatch(login.loginUser(username, password)),
    logoutUser: () => dispatch(login.logoutUser()),
    isLogin: () => dispatch(login.isLogin()),

    // Dashboard
    getDashboard: (value) => dispatch(dashboard.getDashboard(value)),

    // User
    getUsers: (value) => dispatch(user.getUsers(value)),
    createUser: (value) => dispatch(user.createUser(value)),
    editUser: (value) => dispatch(user.editUser(value)),
    deleteUser: (id) => dispatch(user.deleteUser(id)),
    resetPasswordUser: (value) => dispatch(user.resetPasswordUser(value)),
    changeStatus: (id) => dispatch(user.changeStatus(id)),
    getUserRoles: () => dispatch(user.getUserRoles()),

    // Change Passwrod
    changePasswordMe: (value) =>
      dispatch(changePasswordMe.changePasswordMe(value)),

    // Loading
    loading: (key, length) => dispatch(loading.loading(key, length)),
    hide_loading: (key) => dispatch(loading.hide_loading(key)),

    // News
    getNews: (value) => dispatch(news.getNews(value)),
    createNews: (value) => dispatch(news.createNews(value)),
    editNews: (value) => dispatch(news.editNews(value)),
    deleteNews: (value) => dispatch(news.deleteNews(value)),

    // Meeting
    getMeeting: (value) => dispatch(meeting.getMeeting(value)),
    createMeeting: (value) => dispatch(meeting.createMeeting(value)),
    editMeeting: (value) => dispatch(meeting.editMeeting(value)),
    deleteMeeting: (value) => dispatch(meeting.deleteMeeting(value)),
    getMeetingType: () => dispatch(meeting.getMeetingType()),

    //Notify
    getNotify: (value) => dispatch(notify.getNotify(value)),
    createNotify: (value) => dispatch(notify.createNotify(value)),
    editNotify: (value) => dispatch(notify.editNotify(value)),
    deleteNotify: (value) => dispatch(notify.deleteNotify(value)),
    getNotifyType: () => dispatch(notify.getNotifyType()),
    getNotifyDocumentReferences: (value) =>
      dispatch(notify.getNotifyDocumentReferences(value)),

    //qualifiedPerson
    getQualifiedPerson: (value) =>
      dispatch(qualifiedPerson.getQualifiedPerson(value)),
    createQualifiedPerson: (value) =>
      dispatch(qualifiedPerson.createQualifiedPerson(value)),
    editQualifiedPerson: (value) =>
      dispatch(qualifiedPerson.editQualifiedPerson(value)),
    deleteQualifiedPerson: (value) =>
      dispatch(qualifiedPerson.deleteQualifiedPerson(value)),

    //defendant
    getDefendant: (value) => dispatch(defendant.getDefendant(value)),
    createDefendant: (value) => dispatch(defendant.createDefendant(value)),
    editDefendant: (value) => dispatch(defendant.editDefendant(value)),
    deleteDefendant: (value) => dispatch(defendant.deleteDefendant(value)),

    //Appeal
    getAppeal: (value) => dispatch(appeal.getAppeal(value)),
    createAppeal: (value) => dispatch(appeal.createAppeal(value)),
    editAppeal: (value) => dispatch(appeal.editAppeal(value)),
    deleteAppeal: (value) => dispatch(appeal.deleteAppeal(value)),
    getAppealType: () => dispatch(appeal.getAppealType()),

    //Law
    getLaw: (value) => dispatch(law.getLaw(value)),
    createLaw: (value) => dispatch(law.createLaw(value)),
    editLaw: (value) => dispatch(law.editLaw(value)),
    deleteLaw: (value) => dispatch(law.deleteLaw(value)),
    getLawType: () => dispatch(law.getLawType()),

    //Banner
    getBanner: () => dispatch(banner.getBanner()),
    createBanner: (value) => dispatch(banner.createBanner(value)),
    editBanner: (value) => dispatch(banner.editBanner(value)),
    deleteBanner: (value) => dispatch(banner.deleteBanner(value)),
    changeStatusBanner: (value) => dispatch(banner.changeStatusBanner(value)),

    //aboutUs
    getAboutUs: () => dispatch(aboutUs.getAboutUs()),
    editAboutUs: (value) => dispatch(aboutUs.editAboutUs(value)),

    //configuration
    getConfiguration: () => dispatch(configuration.getConfiguration()),
    editConfiguration: (value) =>
      dispatch(configuration.editConfiguration(value)),

    //publicFile
    getPublicFile: () => dispatch(publicFile.getPublicFile()),
    editPublicFile: (value) => dispatch(publicFile.editPublicFile(value)),

    //officeOfQualification
    getOfficeOfQualification: () =>
      dispatch(officeOfQualification.getOfficeOfQualification()),
    editOfficeOfQualification: (value) =>
      dispatch(officeOfQualification.editOfficeOfQualification(value)),

    //Propose
    getPropose: () => dispatch(propose.getPropose()),
    editPropose: (value) => dispatch(propose.editPropose(value)),

    //Address
    getAddress: () => dispatch(address.getAddress()),
    editAddress: (value) => dispatch(address.editAddress(value)),

    //History
    getHistory: (value) => dispatch(history.getHistory(value)),

    // Modal
    hide_modal: () => dispatch(modal.hide_modal()),

    showNotifyDetail: (value) => dispatch(modal.showNotifyDetail(value)),
    showCreateNotify: () => dispatch(modal.showCreateNotify()),
    showEditNotify: (app) => dispatch(modal.showEditNotify(app)),

    showAppealDetail: (value) => dispatch(modal.showAppealDetail(value)),
    showCreateAppeal: () => dispatch(modal.showCreateAppeal()),
    showEditAppeal: (app) => dispatch(modal.showEditAppeal(app)),

    showQualifiedPersonDetail: (value) =>
      dispatch(modal.showQualifiedPersonDetail(value)),
    showCreateQualifiedPerson: () =>
      dispatch(modal.showCreateQualifiedPerson()),
    showEditQualifiedPerson: (app) =>
      dispatch(modal.showEditQualifiedPerson(app)),

    showDefendantDetail: (value) => dispatch(modal.showDefendantDetail(value)),
    showCreateDefendant: () => dispatch(modal.showCreateDefendant()),
    showEditDefendant: (app) => dispatch(modal.showEditDefendant(app)),

    showNewsDetail: (value) => dispatch(modal.showNewsDetail(value)),
    showCreateNews: () => dispatch(modal.showCreateNews()),
    showEditNews: (app) => dispatch(modal.showEditNews(app)),

    showMeetingDetail: (value) => dispatch(modal.showMeetingDetail(value)),
    showCreateMeeting: () => dispatch(modal.showCreateMeeting()),
    showEditMeeting: (app) => dispatch(modal.showEditMeeting(app)),

    showLawDetail: (value) => dispatch(modal.showLawDetail(value)),
    showCreateLaw: () => dispatch(modal.showCreateLaw()),
    showEditLaw: (app) => dispatch(modal.showEditLaw(app)),

    showBannerDetail: (value) => dispatch(modal.showBannerDetail(value)),
    showCreateBanner: () => dispatch(modal.showCreateBanner()),
    showEditBanner: (app) => dispatch(modal.showEditBanner(app)),

    showHistoryDetail: (value) => dispatch(modal.showHistoryDetail(value)),
    showCreateHistory: () => dispatch(modal.showCreateHistory()),
    showEditHistory: (app) => dispatch(modal.showEditHistory(app)),

    showCreateUser: () => dispatch(modal.showCreateUser()),
    showUserDetail: (value) => dispatch(modal.showUserDetail(value)),
    showEditUser: (user) => dispatch(modal.showEditUser(user)),
    showResetPassword: (user) => dispatch(modal.showResetPassword(user)),
    showResetPassword: (user) => dispatch(modal.showResetPassword(user)),

    showViewRole: (role) => dispatch(modal.showViewRole(role)),
    showCreateRole: () => dispatch(modal.showCreateRole()),
    showEditRole: (role) => dispatch(modal.showEditRole(role)),
  };
};
