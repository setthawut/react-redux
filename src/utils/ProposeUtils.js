export const mapProposeApiToForm = (values) => {
 

  return {
    header1: values.length > 0 ? values[0].header1 : "",
    header2: values.length > 0 ? values[1].header2 : "",
    currentImg1: !!values[0] && values[0].documentFiles1.map((item) => item),
    currentImg2: !!values[1] && values[1].documentFiles2.map((item) => item),
  };
};

export const mapEditProposeFormToApiRequest = (values) => {
  const formData = new FormData();
  formData.append("header1", values.header1);
  formData.append("header2", values.header2);
  values.oldImg1.map((item) => formData.append("documentFiles1Ids", item._id));
  values.oldImg2.map((item) => formData.append("documentFiles2Ids", item._id));
  values.imgNew1.map((item) => formData.append("documentFiles1", item));
  values.imgNew2.map((item) => formData.append("documentFiles2", item));
 

  return formData;
};
