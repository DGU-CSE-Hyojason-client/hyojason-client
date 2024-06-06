import { requester } from ".";
import { User } from "../types";

export const matchUri = {
  getElderGroupStatus: "/api/group/status",
  postElderGroupApply: "/api/group/apply",
  getCaregiverGroupStatus: "/api/group/caregiver/status",
  getGroupDetail: "/api/group/detail/:groupId",
};

export const apiUrl = () => import.meta.env.VITE_API_URL || "";

export const getElderGroupStatus = async (): Promise<
  | {
      status: "idle";
      regionId: number;
      applicant: number;
      maximum: number;
    }
  | {
      status: "ongoing";
      regionId: number;
      applicant: number;
      maximum: number;
    }
  | ({
      status: "finish";
    } & Group)
  | null
> => {
  try {
    const res = await requester(
      "get",
      apiUrl() + matchUri.getElderGroupStatus,
      {}
    );
    return await res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export type Group = {
  groupId: number;
  memberNum: number;
  keyword: string[] | null;
  keywordsList: string[];
  users: User[];
};

export type GroupDetail = {
  userList: User[];
};

export type CaregiverGroupStatusResult = {
  groupList: Group[];
  users: User[];
};
// export type CaregiverGroupStatusResult = Group[];

export const getCaregiverGroupStatus =
  async (): Promise<CaregiverGroupStatusResult | null> => {
    try {
      const res = await requester(
        "get",
        apiUrl() + matchUri.getCaregiverGroupStatus,
        {}
      );
      return await res.json();
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const postElderGroupApply = async () => {
  try {
    const res = await requester(
      "post",
      apiUrl() + matchUri.postElderGroupApply,
      {}
    );
    return await res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getGroupDetail = async (
  groupId: number
): Promise<GroupDetail | null> => {
  try {
    const res = await requester(
      "get",
      apiUrl() + `/api/group/detail/${groupId}`,
      {}
    );
    return await res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};
