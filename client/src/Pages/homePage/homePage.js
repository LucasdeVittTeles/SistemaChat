import Header from "../../components/header/header";
import styles from "./homePage.module.css";
import { useFormik } from "formik";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { object, string, number, date } from "yup";
import { validationMessage } from "../../constants/validationMessage";
import { dateMask } from "../../constants/mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const initialValues = {
    name: "",
    age: "",
    height: "",
    date: "",
  };

  const validations = object({
    name: string().required(validationMessage.msg1),
    age: number()
      .required(validationMessage.msg1)
      .typeError(validationMessage.msg2)
      .positive(validationMessage.msg3),
    height: number()
      .required(validationMessage.msg1)
      .typeError(validationMessage.msg2)
      .positive(validationMessage.msg3),
    date: date()
      .required(validationMessage.msg1)
      .typeError(validationMessage.msg4),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      toast.success("Usuario criado com sucesso!");
    },
  });

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <ToastContainer />
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <h1>Cadastro de Pessoa</h1>
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
            text="idade"
            name="age"
            placeholder="digite seu nome"
            value={formik.values.age}
            handleOnChange={formik.handleChange}
            alert={formik.errors.age}
          />
          <Input
            type="text"
            text="altura"
            name="height"
            placeholder="digite sua altura"
            value={formik.values.height}
            handleOnChange={formik.handleChange}
            alert={formik.errors.height}
          />
          <Input
            type="text"
            text="data de nascimento"
            name="date"
            placeholder="digite a data de nascimento"
            value={dateMask(formik.values.date)}
            handleOnChange={formik.handleChange}
            alert={formik.errors.date}
          />
          <Button
            text="Cadastrar"
            backgroundColor={"#0CCE6B"}
            color={"#FFFFFF"}
          />
        </form>
      </div>
    </div>
  );
};

export default HomePage;
