import './styles.css';
import * as authService from '../../../services/auth-service';
import { useState } from 'react';
import { RecoveryDTO } from '../../../models/recovery';

export default function RecoveryLogin() {

    const [formData, setFormData] = useState<RecoveryDTO>({
        email: ''
    })

    function handleSubmit(event: any) {
        event.preventDefault();
        authService.recoveryLogin(formData)
        .then(response => {
             authService.saveTokenPassword(response.data.token)
            console.log(response.data);
        })
        .catch(error  => {
            console.log("Erro de login", error);
        });
    }

    function handleInputChange(event: any) {
        const value = event.target.value;
        const name = event.target.name;
        setFormData({...formData, [name]: value});
    }

    return (
        <main>
            <section id="login-section" className="dsc-container">
                <div className="dsc-login-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Recuperação de senha</h2>
                        <div className="dsc-form-recovery-container">
                            <div>
                                <input 
                                    name="email"
                                    value={formData.email}
                                    className="dsc-form-control"
                                    type="email"
                                    placeholder="Email" 
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