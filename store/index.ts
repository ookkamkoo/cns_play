import { defineStore } from 'pinia';
import type { MemberDetail,SettingDF,GameMenuItem,News,Game,GameRecommend,GameCategory } from './typeMember';


export const memberStore = defineStore('member', {
  state: () => ({
    login: true,
    showLogin: false,
    notify: false,
    memberDetail: {} as MemberDetail,
    settingDefault: {} as SettingDF,
    menuBar: [] as GameMenuItem[],
    news: [] as News[],
    allGame:[
      { category: "CASINO", games: [] },
      { category: "SLOT", games: [] },
      { category: "FISH", games: [] },
      { category: "SPORTSBOOK", games: [] },
      { category: "TRADE", games: [] },
      { category: "CARD", games: [] },
      { category: "LOTTO", games: [] },
      { category: "KENO", games: [] },
      { category: "ESPORT", games: [] },
      { category: "POKER", games: [] },
    ] as GameCategory[] ,
    gameReccommend:[] as GameRecommend[],
  }),
  actions: {
    setMemberDetail(data: MemberDetail) {
      console.log('Setting member detail:', data);
      this.memberDetail = data;
    },
    setShowLogin(bool: boolean) {
      console.log('Setting show login:', bool);
      this.showLogin = bool;
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
    setGameRecommend(data: GameRecommend[]) {
      this.gameReccommend = data;
    },
  },
});