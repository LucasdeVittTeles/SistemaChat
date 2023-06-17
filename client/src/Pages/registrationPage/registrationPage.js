import styles from "../registrationPage/registrationPage.module.css";
import { useFormik } from "formik";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import axios from "axios";
import { number, object, string } from "yup";
import { validationMessage } from "../../constants/validationMessage";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
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
    gender: string().required(validationMessage.msg1),
  });

  const postRegistration = async (values) => {
    await axios
      .post("http://localhost:5000/createUser", {
        email: values.email,
        password: values.password,
        age: values.age,
        name: values.name,
        gender: values.gender,
      })
      .then(() => {
        navigate("/loginPage");
        toast.success("Usuario cadastrado com sucesso.");
      })
      .catch((error) => {
        toast.error(
          "Falha ao tentar cadastrar usuário" + error.response.data.msg
        );
      });
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
          <label htmlFor="gender">Genero</label>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="" select disabled hidden>Selecione um genero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
          <Button
            type="sub"
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
