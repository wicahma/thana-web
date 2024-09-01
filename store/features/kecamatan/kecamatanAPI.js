export const getList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/kecamatan/list`,
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

export const createKecamatan = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/kecamatan/create`,
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

export const updateKecamatan = async (data, uuid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/kecamatan/update/${uuid}`,
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

export const deleteKecamatan = async (uuid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/kecamatan/delete/${uuid}`,
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
