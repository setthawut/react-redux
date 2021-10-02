export const mapAddressApiToForm = (values) => {
  return {
    placeName: values.placeName,
    address: values.address,
    phone: values.phone,
    fax: values.fax,
    email: values.email,
    googleMap: values.googleMapURL,
    facebook: values.facebookURL,
  };
};
