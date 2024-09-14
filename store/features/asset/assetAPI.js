export const getList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  const result = await response.json();
  return result;
};

export const getAll = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  const result = await response.json();
  return result;
};

export const getDashbard = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/dashboard`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  const result = await response.json();
  return result;
};

export const createAsset = async (data) => {
  const formData = new FormData();

  Object.entries(data).map(([key, value]) => {
    if (key === "koordinats") {
      return formData.append(key, JSON.stringify(value));
    }
    formData.append(key, value);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    }
  );
  const result = await response.json();
  return result;
};

export const bulkCreateAsset = async (data, type) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/bulk-create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ datas: data, type: type }),
    }
  );
  const result = await response.json();
  return result;
};

export const updateAsset = async (data) => {
  const formData = new FormData();

  Object.entries(data).map(([key, value]) => {
    if (key === "koordinats") {
      return formData.append(key, JSON.stringify(value));
    }
    formData.append(key, value);
  });

  console.log(formData);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/update/${data.uuid}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    }
  );
  const result = await response.json();
  return result;
};

export const deleteAsset = async (uuid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/delete/${uuid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  const result = await response.json();
  return result;
};

export const detailGuest = async (uuid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/detail-guest/${uuid}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await response.json();
  return result;
};

export const detailAdmin = async (uuid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/detail/${uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  const result = await response.json();
  return result;
};
