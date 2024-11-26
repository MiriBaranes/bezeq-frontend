import React from 'react';

const AuthForm = ({ title, fields, handleSubmit, link, linkText, linkHref }) => (
    <div className="auth-form">
        <h2>{title}</h2>
        {fields.map((field, index) => (
            <div key={index} className="form-field">
                <label>{field.label}</label>
                <input
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={field.onChange}
                    className={field.error ? 'error' : ''}
                />
                {field.error && <span className="error-text">{field.error}</span>}
            </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
        <a href={linkHref}>{linkText}</a>
    </div>
);

export default AuthForm;
