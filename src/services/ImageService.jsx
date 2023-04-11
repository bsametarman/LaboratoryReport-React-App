
export default class ImageService{

    async addImage(image, reportId) {
        fetch(`http://localhost:8080/api/images/add/${reportId}`, {method: 'POST', body: image})
    }
}