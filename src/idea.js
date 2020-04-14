class Idea {
  constructor(ideaObject) {
    this.title = ideaObject.title;
    this.body = ideaObject.body;
    this.id = ideaObject.id || Date.now();
    this.isStarred = ideaObject.isStarred || false;
  }

  saveToStorage() {
    var ideaToStore = ideasArray
    var stringifiedArray = JSON.stringify(ideaToStore);
    localStorage.setItem('ideasArray', stringifiedArray);
  }

  deleteFromStorage() {

  }

  updateIdea() {

  }

  toggleStar() {
    this.isStarred = !this.isStarred;
  }
}
