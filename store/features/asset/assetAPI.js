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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
};

export const updateAsset = async (data, uuid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/update/${uuid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(data),
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
    `${process.env.NEXT_PUBLIC_API_URL}api/asset/detail-guest/${uuid}`,
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
