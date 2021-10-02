import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./LoginReducer";
import DashboardReducer from "./DashboardReducer";

import UserReducer from "./UserReducer";

import RoleReducer from "./RoleReducer";
import ChangePasswordMeReducer from "./ChangePasswordMeReducer";

import NewsReducer from "./NewsReducer";
import MeetingReducer from "./MeetingReducer";
import NotifyReducer from "./NotifyReducer";
import AppealReducer from "./AppealReducer";
import QualifiedPersonReducer from "./QualifiedPersonReducer";
import DefendantReducer from "./DefendantReducer";
import LawReducer from "./LawReducer";
import HistoryReducer from "./HistoryReducer";
import BannerReducer from "./BannerReducer";
import AddressReduce from "./AddressReduce";
import ProposeReducer from "./ProposeReducer";
import AboutUsReducer from "./AboutUsReducer";
import ConfigurationReducer from "./ConfigurationReducer";
import PublicFileReducer from "./PublicFileReducer";
import OfficeOfQualification from "./OfficeOfQualificationReducer";
import LoadingReducer from "./LoadingReducer";
import ModalReducer from "./ModalReducer";
import { reducer as FormReducer } from "redux-form";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),

    login: LoginReducer,
    dashboard: DashboardReducer,

    user: UserReducer,

    role: RoleReducer,
    changePasswordMe: ChangePasswordMeReducer,

    news: NewsReducer,
    meeting: MeetingReducer,
    notify: NotifyReducer,
    appeal: AppealReducer,
    qualifiedPerson: QualifiedPersonReducer,
    defendant: DefendantReducer,
    law: LawReducer,
    banner: BannerReducer,
    address: AddressReduce,
    history: HistoryReducer,
    propose: ProposeReducer,
    aboutUs: AboutUsReducer,
    configuration: ConfigurationReducer,
    publicFile: PublicFileReducer,
    officeOfQualification: OfficeOfQualification,
    loading: LoadingReducer,
    modal: ModalReducer,
    form: FormReducer,
  });

export default createRootReducer;
