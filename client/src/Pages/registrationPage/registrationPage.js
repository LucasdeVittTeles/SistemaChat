import styles from "../registrationPage/registrationPage.module.css";
import { useFormik } from "formik";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import axios from "axios";
import { number, object, string } from "yup";
import { validationMessage } from "../../constants/validationMessage";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: "",
  };

  const validations = object({
    name: string().required(validationMessage.msg1),
    email: string()
      .required(validationMessage.msg1)
      .email(validationMessage.msg6),
    password: string()
      .required(validationMessage.msg1)
      .min(6, validationMessage.msg5),
    age: number()
      .required(validationMessage.msg1)
      .typeError(validationMessage.msg2)
      .positive(validationMessage.msg3),
  });

  const postRegistration = async (values) => {
    try {
      const data = await axios.post("http://localhost:5000/createUser", {
        email: values.email,
        password: values.password,
        name: values.name,
        gender: values.gender,
      });
      navigate("/loginPage", { state: data });
    } catch (error) {
      toast.error("Falha ao tentar cadastrar usuário" + error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (values) => {
      postRegistration(values);
    },
  });

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <h1>Cadastro de usuario</h1>
          <Input
            type="text"
            text="nome"
            name="name"
            placeholder="digite seu nome"
            value={formik.values.name}
            handleOnChange={formik.handleChange}
            alert={formik.errors.name}
          />
          <Input
            type="text"
            text="email"
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
          <Input
            type="text"
            text="Idade"
            name="age"
            placeholder="digite sua idade"
            value={formik.values.age}
            handleOnChange={formik.handleChange}
            alert={formik.errors.age}
          />
          <Button
            text="Cadastrar"
            backgroundColor={"#0CCE6B"}
            color={"#FFFFFF"}
          />
          <Link to="/loginPage">Voltar a tela de Login</Link>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
