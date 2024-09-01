export const getList = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/skpd/list`,
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
  
  export const createSkpd = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/skpd/create`,
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
  
  export const updateSkpd = async (data, uuid) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/skpd/update/${uuid}`,
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
  
  export const deleteSkpd = async (uuid) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/skpd/delete/${uuid}`,
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
  