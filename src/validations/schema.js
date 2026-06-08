import * as Yup from "yup";

const positiveNumberMessage = "Må være positivt tall";
const taxRangeMessage = "Skatt må være mellom 0-100%";

const schema = Yup.object().shape({
  offTime: Yup.number().required().min(0, positiveNumberMessage).default(168),
  hourlyRate: Yup.number().required().min(0, positiveNumberMessage).default(220),
  taxPercentage: Yup.number()
    .required()
    .min(0, taxRangeMessage)
    .max(100, taxRangeMessage)
    .default(30),
  offshorePremium: Yup.number()
    .required()
    .min(0, positiveNumberMessage)
    .default(84.7),
  travelExpenses: Yup.number().min(0, positiveNumberMessage).default(0),
  overtimeOffshoreHours: Yup.number().min(0, positiveNumberMessage).default(0),
  safetyRepresentativeHours: Yup.number()
    .min(0, positiveNumberMessage)
    .default(0),
});

export default schema;
