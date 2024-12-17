/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "./instance";
export type UserT = {
  name: string;
  email: string;
  password: string;
};

export async function RegisterApi({ name, email, password }: UserT) {
  try {
    const response = await instance.post("/users", {
      name,
      email,
      password,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (err: any) {
    console.error("API ERROR", err);
    return {
      status: err.status,
      data: err.response.data,
    };
  }
}

export type LoginT = {
  email: string;
  password: string;
};
export async function LoginApi({ email, password }: LoginT) {
  try {
    const response = await instance.post("/auth/login", { email, password });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getMeApi() {
  try {
    const response = await instance.get("/users/me");
    return await response.data;
  } catch (err) {
    console.log(err);
  }
}
