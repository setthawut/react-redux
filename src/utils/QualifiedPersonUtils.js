import moment from "moment";

export const mapCreateQualifiedPersonFormToApiRequest = (values) => {
  const formData = new FormData();
  formData.append("type", "QualifiedPerson"); // รอหลังบ้านว่าจะให้ส่ง type ไรไป
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
export const mapEditQualifiedPersonFormToApiRequest = (id, values) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("type", "QualifiedPerson"); // รอหลังบ้านว่าจะให้ส่ง type ไรไป
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

export const mapQualifiedPersonApiToEditForm = (values) => {
  return {
    publishDate: moment(values.publishDate),
    appealType: values.type,
    dateMeeting: moment(values.meetingDate).format("yyyy"),
    description: values.description,
    title: values.header,
    fileQualifiedPerson: values.documentFiles,
    fileQualifiedPersonNonPublish: values.documentFilesNonPublish,
  };
};
