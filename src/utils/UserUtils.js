export function mapCreateUserFormToApiRequest(values) {
  return {
    username: values.username,
    password: values.password,
    name: values.name,
    position: values.position,
    institution: values.institution,
    email: values.email,
    phone: values.phone,
    role: values.role,
  };
}
export function mapResetPasswordUserApiToEditForm(values) {
  return { username: values.username };
}

export function mapResetPasswordUserFormToApiRequest(id, values) {
  return {
    id: id,
    password: values.password,
  };
}

export function mapEditUserFormToApiRequest(id, values) {
  return {
    id: id,
    username: values.username,
    name: values.name,
    position: values.position,
    institution: values.institution,
    email: values.email,
    phone: values.phone,
    role: values.role,
  };
}

export function mapEditUserApiToEditForm(values) {
  return {
    username: values.username,
    name: values.name,
    position: values.position,
    institution: values.institution,
    email: values.email,
    role: values.role,
    phone: values.phone,
  };
}
