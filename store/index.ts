import { defineStore } from 'pinia';
import type { MemberDetail } from './typeMember';


export const memberStore = defineStore('member', {
  state: () => ({
    login: true,
    memberDetail: {} as MemberDetail,
  }),
  actions: {
    setMemberDetail(data: MemberDetail) {
      console.log('Setting member detail:', data);
      this.memberDetail = data;
    },
    setMemberLogin(bool: boolean) {
      console.log('Setting login status to:', bool);
      this.login = bool;
    },
  },
});