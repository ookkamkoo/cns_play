import { defineStore } from 'pinia';
import type { MemberDetail,SettingDF,GameMenuItem,News } from './typeMember';


export const memberStore = defineStore('member', {
  state: () => ({
    login: true,
    notify: false,
    memberDetail: {} as MemberDetail,
    settingDefault: {} as SettingDF,
    menuBar: [] as GameMenuItem[],
    news: [] as News[],
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
    setMemberNotify(bool: boolean) {
      console.log('Setting notify status to:', bool);
      this.notify = bool;
    },
    setMemberSettindDF(data: SettingDF) {
      this.settingDefault = data;
    },
    setMemberNews(data: News[]) {
      this.news = data;
    },
    setMenuBar(data: GameMenuItem[]) {
      this.menuBar = data;
    },
  },
});