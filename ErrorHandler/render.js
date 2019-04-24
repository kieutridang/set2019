class errorHandler {
    renderError () {
        if (this.specifyError() != '') {
            let position = 'top-left'
            let timeout = 3
            let isStacked = false
            let alertError = new Alert(position,timeout,isStacked)
            alertError.error()
        }
    }
}