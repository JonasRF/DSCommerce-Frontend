/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import './styles.css';
import { Link, useNavigate } from "react-router-dom";
import * as authService from '../../../services/auth-service';
import * as forms from '../../../utils/forms';
import { ContextToken } from '../../../utils/context-token';
import FormInput from '../../../components/FormInput';

export default function Login() {

    const { setContextTokenPayload } = useContext(ContextToken);

    const navigate = useNavigate();

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const [formData, setFormData] = useState<any>({
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            placeholder: "Email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Favor informar um email válido",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Senha",
        }
    })

    function handleSubmit(event: any) {
        event.preventDefault();

        setSubmitResponseFail(false);

        const formDataValidated = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {
           setFormData(formDataValidated);
           return;
        }

        authService.loginRequest(forms.toValue(formData))
            .then(response => {
                authService.saveAccessToken(response.data.access_token);
                setContextTokenPayload(authService.getAccessTokenPayload());
                navigate("/cart");
            })
            .catch(()=> {
                setSubmitResponseFail(true);
            });
    }

    function handleInputChange(event: any) {
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value));
    }

    function handleTurnDurty(name: string) {
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    return (
        <main>
            <section id="login-section" className="dsc-container">
                <div className="dsc-login-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <Link className='signup' to={"/signup"}>
                            <div className='new'>New User?</div>
                            <div className='sign'>Sign Up Here</div>
                        </Link>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.username}
                                    className="dsc-form-control"
                                    onTurnDurty={handleTurnDurty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.username.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.password}
                                    className="dsc-form-control"
                                    onTurnDurty={handleTurnDurty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <Link className='forgot' to={"/recovery"}>
                                    <div>Forgot Password?</div>
                                </Link>
                            </div>
                        </div>
                        {
                            submitResponseFail &&
                            <div className="dsc-form-global-error">
                                Usuário ou senha inválidos
                            </div>
                        }
                        <div className="dsc-login-form-buttons dsc-mt20">
                            <button type="submit" className="dsc-btn dsc-btn-blue">Entrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}