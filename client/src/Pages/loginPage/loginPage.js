import styles from "../loginPage/loginPage.module.css";
import { useFormik } from "formik";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import axios from "axios";
import { object, string } from "yup";
import { validationMessage } from "../../constants/validationMessage";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validations = object({
    email: string()
      .required(validationMessage.msg1)
      .email(validationMessage.msg6),
    password: string()
      .required(validationMessage.msg1)
      .min(6, validationMessage.msg5),
  });

  const postLogin = async (values) => {
    await axios
      .post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      })
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", data.data.id);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Falha ao tentar login: " + error.response.data.msg);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (values) => {
      postLogin(values);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <h1>Login de usuario</h1>
          <Input
            type="text"
            text="E-mail"
            name="email"
            placeholder="digite seu e-mail"
            value={formik.values.email}
            handleOnChange={formik.handleChange}
            alert={formik.errors.email}
          />
          <Input
            type="password"
            text="Senha"
            name="password"
            placeholder="digite sua senha"
            value={formik.values.password}
            handleOnChange={formik.handleChange}
            alert={formik.errors.password}
          />
          <p>
            Nao esta cadastrado?
            <Link className={styles.link} to="/registrationPage">
              Cadastre-se
            </Link>
          </p>
          <Link className={styles.link} to="/recoverPassword">
            Redefina sua senha aqui
          </Link>
          <Button text="Entrar" backgroundColor={"#0CCE6B"} color={"#FFFFFF"} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
