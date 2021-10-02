export const mapAboutUsApiToEditForm = (values) => {
  return {
    members: values.detail,
  };
};

export const mapEditAboutUsFormToApiRequest = (values) => {
  let res = values.members.map((item) => {
    ////////// เอารูป base64 มารวมกันใน Array เดียวกันกดยิง Api
    let img = !!item.img ? item.img.map((item2) => item2) : ""; // รูปใหม่
    let documentFiles = !!item.documentFiles // รูปเก่า
      ? item.documentFiles.map((item2) => item2)
      : "";

    return {
      header: !!item.header ? item.header : "",
      description: !!item.description ? item.description : "",
      documentFiles: [...img, ...documentFiles],
    };
  });
  let dataReturn = { aboutus: res };
  return dataReturn;
};
