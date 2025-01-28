
import React, { useEffect, useState } from 'react';
import * as productService from '../../services/product-service';
import styles from '../../components/ImageUpload/imageUpload.module.css';
import UploadImg from '../../assets/Upload.svg';

type Props = {
    onUploadSucess: (imgUrl: string) => void;
    productImgUrl: string;
}

export default function ImageUpload({ onUploadSucess, productImgUrl }: Props) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImgUrl, setUploadedImgUrl] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    useEffect(() => {
        setImgUrl(productImgUrl || (uploadedImgUrl ? URL.createObjectURL(uploadedImgUrl) : null));
    }, [productImgUrl, uploadedImgUrl]);

    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 1000) / progressEvent.total);

        setUploadProgress(progress);
    }

    useEffect(() => {
        if (uploadedImgUrl) {
            const formData = new FormData();
            formData.append('file', uploadedImgUrl);
            productService.uploadImage(uploadedImgUrl, onUploadProgress)
                .then((response) => {
                    setUploadProgress(response.data.uri);
                    onUploadSucess(response.data.uri);
                })
                .catch((error: Error) => {
                    console.log('Erro ao fazer upload de imagem: ', error);
                });
        }
    }, [onUploadSucess, uploadedImgUrl]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            setUploadedImgUrl(files?.[0]);
            setUploadProgress(0);
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
                <div className={styles.uploadedImageContainer}>
                    {imgUrl ? (
                        <>
                
                        <img src={imgUrl} alt="Imagem do produto" />
                        </>
                    ) : (
                        <img src={UploadImg} alt="Upload" hidden/>
                    )}
                    {uploadProgress > 0 && (
                        <div className={styles.uploadProgress}>
                            <div style={{ width: `${uploadProgress}%` }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
