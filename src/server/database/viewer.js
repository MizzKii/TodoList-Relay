class Viewer {
  constructor(id) {
    this.id = id
  }
}

const viewer = new Viewer(0)
const getViewer = () => viewer

export {
  Viewer,
  getViewer
}
