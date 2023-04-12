import axios from 'axios'

export default class ImageService{

    async addImage(image, reportId) {
        fetch(`http://localhost:8080/api/images/add/${reportId}`, {method: 'POST', body: image})
    }

    async deleteImage(imageId){
        axios.post(`http://localhost:8080/api/images/delete/${imageId}`)
    }
}