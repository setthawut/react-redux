import {
  getDateFromStringDate,
  getDateTimeFromStringDate,
} from "../utils/DateUtils.js";
import moment from "moment";

const dateNow = moment();

export const mapCreateLawFormToApiRequest = async (values) => {
  const formData = new FormData();
  formData.append("type", values.meetingType);
  formData.append("publishDate", values.publishDate);
  formData.append("meetingDate", values.dateMeeting);
  formData.append("header", values.title);
  formData.append("description", values.description);

  values.documentFiles.map((item) =>
    formData.append("documentFiles", !!item ? item : ""),
  );

  values.documentFilesNonPublish.map((item) =>
    formData.append("documentFilesNonPublish", !!item ? item : ""),
  );

 
  return formData;
};
export const mapEditLawFormToApiRequest = (id, values) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("type", values.lawType);
  formData.append("publishDate", values.publishDate);
  formData.append("meetingDate", values.dateMeeting);
  formData.append("header", values.title);
  formData.append("description", values.description);

  values.documentFiles.map((item) =>
    formData.append("documentFiles", !!item ? item : ""),
  );

  values.documentFilesNonPublish.map((item) =>
    formData.append("documentFilesNonPublish", !!item ? item : ""),
  );

  values.oldFile.map((item) =>
    formData.append("documentFilesOld", !!item ? item._id : ""),
  );

  values.oldFileNonPublish.map((item) =>
    formData.append("documentFilesNonPublishOld", !!item ? item._id : ""),
  );


  return formData;
};

export const mapLawApiToEditForm = (values) => {
  return {
    publishDate: moment(values.publishDate),
    lawType: values.type,
    dateNotify: moment(values.publishDate),
    dateMeeting: moment(values.meetingDate).format("yyyy"),
    description: values.description,
    title: values.header,
    numberOfMeeting: values.numberOfMeeting,
    fileLaw: values.documentFiles,
    fileLawNonPublish: values.documentFilesNonPublish,
  };
};
