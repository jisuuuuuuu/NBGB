class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => new Promise(((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
        })))
    }

    _initRequest() {
	    const xhr = this.xhr = new XMLHttpRequest();
	    xhr.open('POST', '/images/onlineUpload', true); // 저장 경로를 /img/upload/로 변경
	    xhr.responseType = 'json';
	}

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = '파일을 업로드 할 수 없습니다.'

        xhr.addEventListener('error', () => { reject(genericErrorText) });
        xhr.addEventListener('abort', () => reject());
xhr.addEventListener('load', () => {
    const response = xhr.response;
    if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
    }
    
    resolve({
        default: response.url
    });
});
    }

   _sendRequest(file) {
	    const data = new FormData();
	    data.append('upload', file);
	    this.xhr.open('POST', '/images/onlineUpload', true); // 저장 경로를 /img/upload/로 변경
	    this.xhr.send(data);
	}
}