class APIHandler {

  constructor (url) {
    this.api = axios.create({
        baseURL: url
    })
  }

}

export default APIHandler
