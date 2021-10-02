import moment from "moment";

export const mapNotifyApiToEditForm = (values) => {
  let mapDocumentReferences = !!values.documentReferences
    ? values.documentReferences.map((item) => ({
        value: item._id,
        label: item.header,
      }))
    : "";

  return {
    publishDate: moment(values.publishDate),
    notifyType: values.type,
    dateMeeting: moment(values.meetingDate),
    governmentDate: !!values.governmentDate
      ? moment(values.governmentDate)
      : "",
    description: values.description,
    title: values.header,
    numberOfMeeting: values.numberOfMeeting,
    fileNotify: values.documentFiles,
    fileNotifyNonPublish: values.documentFilesNonPublish,
    year: values.year,
    documentReferences: mapDocumentReferences,
  };
};

export const mapCreateNotifyFormToApiRequest = (values) => {
  const formData = new FormData();
  formData.append("type", values.notifyType);
  formData.append("publishDate", values.publishDate);
  formData.append(
    "governmentDate",
    !!values.governmentDate ? values.governmentDate : "", //ถ้าไม่ดัก user ไม่กรอก field นี้จะ error
  );
  formData.append("meetingDate", values.dateMeeting);
  formData.append("header", values.title);
  formData.append("description", values.description);
  formData.append("year", values.year);
  formData.append(
    "numberOfMeeting",
    !!values.numberOfMeeting ? values.numberOfMeeting : "",
  );

  values.documentFiles.map((item) =>
    formData.append("documentFiles", !!item ? item : ""),
  );

  values.documentFilesNonPublish.map((item) =>
    formData.append("documentFilesNonPublish", !!item ? item : ""),
  );
  !!values.documentReferences &&
    values.documentReferences.map((item) =>
      formData.append("documentReferences", !!item ? item.value : ""),
    );

  return formData;
};

export const mapEditNotifyFormToApiRequest = (id, values) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("type", values.notifyType);
  formData.append("publishDate", values.publishDate);
  formData.append("meetingDate", values.dateMeeting);
  formData.append(
    "governmentDate",
    !!values.governmentDate ? values.governmentDate : "", //ถ้าไม่ดัก user ไม่กรอก field นี้จะ error
  );
  formData.append("header", values.title);
  formData.append("description", values.description);
  formData.append("year", values.year);
  formData.append(
    "numberOfMeeting",
    !!values.numberOfMeeting ? values.numberOfMeeting : "",
  );

  values.documentFiles.map((item) =>
    formData.append("documentFiles", !!item ? item : ""),
  );

  values.documentFilesNonPublish.map((item) =>
    formData.append("documentFilesNonPublish", !!item ? item : ""),
  );
  values.documentReferences.map((item) =>
    formData.append("documentReferences", !!item ? item.value : ""),
  );
  values.oldFile.map((item) =>
    formData.append("documentFilesOld", !!item ? item._id : ""),
  );

  values.oldFileNonPublish.map((item) =>
    formData.append("documentFilesNonPublishOld", !!item ? item._id : ""),
  );

  return formData;
};
