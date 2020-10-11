export const previewImgInEditorMethod=(response,str,canvas,uploadHandler,uploadFile)=>{

    const img = document.createElement('img');
    const reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result
        img.onload = function (url) {
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const MAX_WIDTH = 500;
            const MAX_HEIGHT = 200;
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(function (blob) {
                uploadHandler([new File([blob], uploadFile.name)])
            }, uploadFile.type, 1);
        }
    }
    reader.readAsDataURL(uploadFile);
}