import moment from "moment";

export const mapNewsApiToEditForm = (values) => {
  return {
    publishDate: moment(values.publishDate),
    description: values.description,
    title: values.header,
    img: values.documentFiles,
  };
};

export const mapCreateNewsFormToApiRequest = (values) => {
  const formData = new FormData();
  

  formData.append("publishDate", values.publishDate);
  formData.append("description", values.description);
  formData.append("header", values.title);
  values.img.map((item) => formData.append("documentFiles", item));



  return formData;
};

export const mapEditNewsFormToApiRequest = (id, values) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("publishDate", values.publishDate);
  formData.append("description", values.description);
  formData.append("header", values.title);
  values.img.map((item) => formData.append("documentFiles", item));
  values.oldImg.map((item) => formData.append("documentFilesOld", item._id));

  

  return formData;
};
