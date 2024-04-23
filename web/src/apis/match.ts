import { User } from "../types";

export const matchUri = {
  getElderGroupStatus: "/api/group/status",
  postElderGroupApply: "/api/group/apply",
  getCaregiverGroupStatus: "/api/group/caregiver/status",
  getGroupDetail: "/api/group/detail/:groupId",
};

export const getElderGroupStatus = async (): Promise<
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
    const res = await fetch(matchUri.getElderGroupStatus, { method: "get" });
    return await res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export type Group = {
  groupId: number;
  memberNum: number;
  keyword: string[];
};

export type GroupDetail = {
  userList: User[];
};

export type CaregiverGroupStatusResult = {
  groupList: Group[];
  users: User[];
};
export const getCaregiverGroupStatus =
  async (): Promise<CaregiverGroupStatusResult | null> => {
    try {
      const res = await fetch(matchUri.getCaregiverGroupStatus, {
        method: "get",
      });
      return await res.json();
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const postElderGroupApply = async () => {
  try {
    const res = await fetch(matchUri.postElderGroupApply, { method: "post" });
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
    const res = await fetch(`/api/group/detail/${groupId}`, { method: "get" });
    return await res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
};
