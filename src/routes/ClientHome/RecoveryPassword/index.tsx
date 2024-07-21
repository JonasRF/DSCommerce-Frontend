import './styles.css';
import * as authService from '../../../services/auth-service';
import { useState } from 'react';
import { PasswordDTO } from '../../../models/recovery';

export default function RecoveryPassword() {

    const [formData, setFormData] = useState<PasswordDTO>({
        password: ''
    })

    function handleSubmit(event: any) {
        event.preventDefault();

        let url = window.location.pathname;
        let parts = url.split('/');
        let token = parts.pop() || parts.pop();
        console.log(token);

        authService.recoveryPassword(formData, String(token))
            .then(response => {
                console.log(response.status);
            })
            .catch(error => {
                console.log("Erro de login", error);
            });
    }

    function handleInputChange(event: any) {
        const value = event.target.value;
        const name = event.target.name;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <main>
            <section id="login-section" className="dsc-container">
                <div className="dsc-login-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Nova senha</h2>
                        <div className="dsc-form-recovery-container">
                            <div>
                                <input
                                    name="password"
                                    value={formData.password}
                                    className="dsc-form-control"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error"></div>
                            </div>
                        </div>

                        <div className="dsc-recovery-form-buttons dsc-mt20">
                            <button type="submit" className="dsc-btn dsc-btn-blue">Enviar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}