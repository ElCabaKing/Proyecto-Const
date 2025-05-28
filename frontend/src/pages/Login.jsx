import Form from "../components/FormularioLogin"

function Login() {
    return <Form route="/api/token/" method="login" />
}

export default Login