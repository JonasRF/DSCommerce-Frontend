/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import FormInput from "../../../../components/FormInput";
import * as forms from '../../../../utils/forms';
import * as productService from '../../../../services/product-service';
import * as categoryService from '../../../../services/category-service';
import FormTextArea from "../../../../components/FormTextArea";
import { CategoryDTO } from "../../../../models/category";
import FormSelect from "../../../../components/FormSelect";
import { selectStyles } from "../../../../utils/select";
import ImageUpload from "../../../../components/ImageUpload";

export default function ProductForm() {

    const params = useParams();

    const isEditing = params.productId !== 'create';
    const navigate = useNavigate();

    const [uploadedImgUrl, setUploadedImgUrl] = useState("");
    const [productImgUrl, setProductImgUrl] = useState("");

    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const [formData, setFormData] = useState<any>({

        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return /^.{3,80}/.test(value);
            },
            message: "Favor informar um nome de 3 a 80 caracteres"
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function (value: any) {
                return Number(value) > 0;
            },
            message: "Favor informar um valor positivo"
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição",
            validation: function (value: string) {
                return /^.{10,}/.test(value);
            },
            message: "Descrição de no mínimo 10 caracteres"
        },
        categories: {
            value: [],
            id: "categories",
            name: "categories",
            placeholder: "Categorias",
            validation: function (value: CategoryDTO[]) {
                return value.length > 0;
            },
            message: "Escolha pelo menos uma categoria"
        }
    })

    useEffect(() => {
        categoryService.findPageRequestCategories()
            .then(response => {
                setCategories(response.data);
            })
    }, []);

    useEffect(() => {

        if (isEditing) {
            productService.findById(Number(params.productId))
                .then(response => {
                    setFormData(forms.updateAll(formData, response.data));
                    setProductImgUrl(response.data.imgUrl);
                })
        }
    }, []);

    function handleInputChange(event: any) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    function handleTurnDurty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        formData.imgUrl.value = uploadedImgUrl || productImgUrl;

        const formDataValidated = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {
           setFormData(formDataValidated);
           return;
        }

        const requestBody = forms.toValue(formData);
        if (isEditing) {
            requestBody.id = Number(params.productId);
        }
        const request = isEditing ? productService.updateRequest(requestBody) : productService.insertRequest(requestBody);
        request
            .then(() => {
                navigate("/admin/products");
            })
            .catch(error => {
                const newInputs = forms.setBackendErrors(formData, error.response.data.errors);
                setFormData(newInputs);
            });
    }

    const onUploadSuccess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
    }

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <div className="dsc-card dsc-form">
                        <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                            <h2>Dados do Produto</h2>
                            <div className="dsc-form-controls-container">
                                <div>
                                    <FormInput
                                        {...formData.name}
                                        className="dsc-form-control"
                                        onTurnDurty={handleTurnDurty}
                                        onChange={handleInputChange}
                                    />
                                    <div className="dsc-form-error">{formData.name.message}</div>
                                </div>
                                <div>
                                    <FormInput
                                        {...formData.price}
                                        className="dsc-form-control"
                                        onTurnDurty={handleTurnDurty}
                                        onChange={handleInputChange}
                                    />
                                    <div className="dsc-form-error">{formData.price.message}</div>
                                </div>
                                <div>
                               <ImageUpload onUploadSucess={onUploadSuccess} productImgUrl={productImgUrl} />     
                               </div>
                                <div>
                                    <FormSelect
                                        {...formData.categories}
                                        className="dsc-form-control dsc-form-select-container"
                                        styles={selectStyles}
                                        options={categories}
                                        onChange={(obj: any) => {
                                            const newFormData = forms.update(formData, "categories", obj);
                                            console.log(newFormData.categories)
                                            setFormData(newFormData);
                                        }}
                                        onTurnDurty={handleTurnDurty}
                                        isMulti
                                        getOptionLabel={(obj: { name: any; }) => obj.name}
                                        getOptionValue={(obj: { id: any; }) => String(obj.id)}
                                    />
                                    <div className="dsc-form-error">{formData.categories.message}</div>
                                </div>
                                <div>
                                    <FormTextArea
                                        {...formData.description}
                                        className="dsc-form-control dsc-textarea"
                                        onTurnDurty={handleTurnDurty}
                                        onChange={handleInputChange}
                                    />
                                    <div className="dsc-form-error">{formData.description.message}</div>
                                </div>
                            </div>
                            <div className="dsc-product-form-button">
                                <Link to="/admin/products">
                                    <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                                </Link>
                                <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}