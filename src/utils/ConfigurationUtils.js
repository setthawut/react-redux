export const mapConfigurationApiToForm = (values) => {
  console.log(values);
  return {
    documentFiles1: values.documentFiles1,
    documentFiles2: values.documentFiles2,
  };
};

export const mapConfigurationFormToApiRequest = (values) => {
  const arr = [];

  let img1 = !!values.img1 ? values.img1.map((item2) => item2) : "";
  let img2 = !!values.img2 ? values.img2.map((item2) => item2) : "";
  let documentFiles1 = !!values.documentFiles1 // รูปเก่า
    ? values.documentFiles1.map((item2) => item2)
    : "";
  let documentFiles2 = !!values.documentFiles2 // รูปเก่า
    ? values.documentFiles2.map((item2) => item2)
    : "";
  let setData = {
    documentFiles1: [...img1, ...documentFiles1],
    documentFiles2: [...img2, ...documentFiles2],
  };

  arr.push(setData);

  let data = { configuration: arr };

  return data;
};
