interface LanguageManager {
  lang: string;
  changeLang: (lang: string) => void;
}

export const languageManager: LanguageManager = {
  lang: '',
  changeLang(t: string) {
    this.lang = t;
  },
};
