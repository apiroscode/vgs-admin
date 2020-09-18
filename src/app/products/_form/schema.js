import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  brand: yup.string().required(),
  description: yup.string(),
  price: yup.number().required(),
  crossOutPrice: yup.number().required(),
  weight: yup.number().required(),
});

export default schema;
