
import React, { useState } from 'react';
import { api } from '../../utils/api';
import { AxiosProgressEvent } from 'axios';
import styles from '../../components/ImageUpload/imageUpload.module.css';
import UploadImg from '../../../public/Upload.svg';

type Props = {
    onUploadSucess: (imgUrl: string) => void;
    productImgUrl: string;
}

export default function ImageUpload({ onUploadSucess, productImgUrl }: Props) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImgUrl, setUploadedImgUrl] = useState("");

    const imgUrl = productImgUrl || uploadedImgUrl;
    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
        setUploadProgress(progress);
    }

    const UploadImage = async (selectedImage: File) => {
        const formData = new FormData();
        formData.append("file", selectedImage);

await api.post("/products/image", formData, {
    onUploadProgress,
})
.then((response) => {
    setUploadedImgUrl(response.data.url);
    onUploadSucess(response.data.url);
})
}
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];
        if (selectedImage) {
            UploadImage(selectedImage);
        }
    }
    return (
        <div className="row">
            <div className="col-6">
                <div className={styles.uploadButtonContainer}>
                    <input type="file" id="upload" accept="image/png, image/jpg" onChange={handleChange} hidden />
                    <label htmlFor='upload'>ADICIONAR IMAGEM</label>
                    <small className={styles.uploadTextHelper}>A imagem deve ser JPG ou PNG e <br /> não deve ultrapassar
                        <strong> 5 mb.</strong> </small>
                </div>
            </div>
            <div className="col-6">
                {
                    uploadProgress > 0 && (
                        <>
                            <img src={UploadImg} alt='Upload' />
                            <div className={styles.uploadProgressContainer}>
                                <div className={styles.uploadProgress} style={{ width: `${uploadProgress}` }}></div>
                            </div>
                        </>
                    )
                }
                {
                    imgUrl && uploadProgress === 0 && (
                        <img src={imgUrl} alt={imgUrl} className={styles.uploadImage} />
                    )
                }
            </div>
        </div>
    )

}
