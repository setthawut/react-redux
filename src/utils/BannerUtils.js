export const mapCreateBannerFormToApiRequest = (values) => {
  const formData = new FormData();
  formData.append("name", values.groupName);

  values.members.map((item) => {
    formData.append("documentFiles", !!item.fileImg ? item.fileImg : "");
    formData.append("description", !!item.description ? item.description : "");
    formData.append("url", !!item.url ? item.url : "");
  });

  return formData;
};

export const mapEditMeetingFormToApiRequest = (id, values) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", values.groupName);

  values.members.map((item) => {
    formData.append("documentFiles", !!item.fileImg ? item.fileImg : "");
    formData.append(
      "documentIds",
      !!item.fileImg ? "" : !!item.documentFiles ? item.documentFiles : "",
    );
    formData.append("description", !!item.description ? item.description : "");
    formData.append("url", !!item.url ? item.url : "");
  });

  for (var [key, value] of formData.entries()) {
    console.log(key, value);
  }
  return formData;
};

export const mapMeetingApiToEditForm = (values) => {
  return {
    groupName: values.name,
    members: values.detail,
  };
};
