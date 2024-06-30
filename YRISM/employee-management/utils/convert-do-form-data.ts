export const objectToFormData = (
  obj: any,
  form?: FormData,
  namespace?: string
) => {
  var fd = form || new FormData();
  var formKey;

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};

export const formDataToObject = (formData: FormData) => {
  const data: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    let keys = key.split('[').map((part) => part.replace(']', ''));

    let obj = data;

    for (let i = 0; i < keys.length - 1; i++) {
      let currentKey = keys[i];
      let nextKey = keys[i + 1];

      if (!obj[currentKey]) {
        obj[currentKey] = /^\d+$/.test(nextKey) ? [] : {};
      }

      obj = obj[currentKey];
    }

    if (isNaN(value as any)) {
      obj[keys[keys.length - 1]] = value;
    } else {
      obj[keys[keys.length - 1]] = parseInt(value as any);
    }
  }

  return data;
};
