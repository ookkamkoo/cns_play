import { defineStore } from 'pinia';
import type { MemberDetail } from './typeMember';

export const memberStore = defineStore('member', {
  state: () => ({
    login: true,
    memberDetail: {} as MemberDetail,
  }),
  actions: {
    setMemberDetail(data: MemberDetail) {
      this.memberDetail = data;
    },
    setMemberLogin(bool: boolean) {
      this.login = bool;
    },
  },
});