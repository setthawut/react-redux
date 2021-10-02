import moment from "moment";

export const mapMeetingApiToEditForm = (values) => {
  return {
    publishDate: moment(values.publishDate),
    meetingType: values.type,
    dateMeeting: moment(values.meetingDate),
    description: values.description,
    title: values.header,
    numberOfMeeting: values.numberOfMeeting,
    fileMeeting: values.documentFiles,
    fileMeetingNonPublish: values.documentFilesNonPublish,
    year: values.year,
  };
};

export const mapEditMeetingFormToApiRequest = (id, values) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("type", values.meetingType);
  formData.append("publishDate", values.publishDate);
  formData.append("meetingDate", values.dateMeeting);
  formData.append("header", values.title);
  formData.append("description", values.description);
  formData.append("year", values.year);
  formData.append("numberOfMeeting", values.numberOfMeeting);

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

export const mapCreateMeetingFormToApiRequest = async (values) => {
  const formData = new FormData();

  formData.append("type", values.meetingType);
  formData.append("publishDate", values.publishDate);
  formData.append("meetingDate", values.dateMeeting);
  formData.append("header", values.title);
  formData.append("description", values.description);
  formData.append("year", values.year);
  formData.append("numberOfMeeting", values.numberOfMeeting);

  values.documentFiles.map((item) =>
    formData.append("documentFiles", !!item ? item : ""),
  );

  values.documentFilesNonPublish.map((item) =>
    formData.append("documentFilesNonPublish", !!item ? item : ""),
  );

  return formData;
};
