import { Avatar } from "../interfaces/avatar/avatar";
import axios from "axios";

const API_BASE_URL = "/api/avatars";

export const getAvatarById = async (avatarId: string): Promise<Avatar> => {
  try {
    const resp = await fetch(`${API_BASE_URL}/${avatarId}`, {
      method: "GET",
    });

    if (!resp.ok) {
      throw new Error(`Error code: ${resp.status} message: ${resp.statusText}`);
    }

    const data = await resp.json();
    return data;
  } catch (e) {
    console.error("Failed to get avatar:", e);
    throw e;
  }
};

export const uploadAvatar = async (
  avatarId: string,
  avatarFile: File
): Promise<{ filePath: string }> => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const resp = await axios.post(
      `http://localhost:5000/nserver/avatar/${avatarId}`,
      formData,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return resp.data;
  } catch (e) {
    console.error("Failed to add avatar:", e);
    throw e;
  }
};

export const deleteAvatarById = async (avatarId: string): Promise<void> => {
  try {
    const resp = await fetch(`${API_BASE_URL}/${avatarId}`, {
      method: "DELETE",
    });

    if (!resp.ok) {
      throw new Error(`Error code: ${resp.status} message: ${resp.statusText}`);
    }
  } catch (e) {
    console.error("Failed to delete avatar:", e);
    throw e;
  }
};
