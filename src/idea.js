class Idea {
  constructor(ideaObject) {
    this.body = ideaObject.body;
    this.id = ideaObject.id || Date.now();
    this.title = ideaObject.title;
    this.isStarred = ideaObject.isStarred || false;
  }

  saveToStorage() {
    var ideaToStore = ideasArray
    var stringifiedArray = JSON.stringify(ideaToStore);
    localStorage.setItem('ideasArray', stringifiedArray);
  }

  toggleStar() {
    this.isStarred = !this.isStarred;
  }
}
