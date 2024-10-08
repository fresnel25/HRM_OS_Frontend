import axios from "axios";
import { toast } from "react-toastify";

// Get Roles
export const getRoles = async () => {
  const { data } = await axios.get(`role?query=all`);
  return data;
};

// Create Role

export const addRole = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      url: `role`,
      data: {
        ...values
      }
    });
    //dispatching data
    toast.success("Ajout réussi");

    return {
      data,
      message: "success"
    };
  } catch (error) {
    toast.error("Erreur lors de l'ajout de l'autorisation, réessayez");
    console.log(error.message);
    return {
      message: "error"
    };
  }
};

// Detail Role View

export const loadSingleRole = async (id) => {
  //dispatching with an call back function and returning that

  try {
    const { data } = await axios.get(`role/${id}`);
    return {
      data,
      message: "Success"
    };
    //dispatching data
  } catch (error) {
    console.log(error.message);
  }
};

//Add Permission in Role

export const addPermission = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      url: `role-permission`,
      data: {
        ...values
      }
    });
    //dispatching data
    toast.success("Ajout réussi");

    return {
      data,
      message: "success"
    };
  } catch (error) {
    toast.error("Erreur lors de la mise a jour de l'autorisation, réessayez");
    console.log(error.message);
    return {
      message: "error"
    };
  }
};

// Get Permsiion
export const loadPermission = async () => {
  const { data } = await axios.get(`permission?query=all`);
  return data;
};

// delete Role permissions
export const deleteRolePermission = async (value) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      url: `role-permission?query=deletemany`,
      data: value
    });
    //dispatching data
    toast.success("Suppression réussi");

    return {
      data,
      message: "success"
    };
  } catch (error) {
    toast.error("Erreur lors de la suppression de l'autorisation, réessayez");
    console.log(error.message);
    return {
      message: "error"
    };
  }
};
