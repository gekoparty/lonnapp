import * as Yup from 'yup';

const schema = Yup.object().shape({
    offTime: Yup.number().required().default(168),
    hourlyRate: Yup.number().required().default(220).test("hourRate", "Må være positivt tall", value => value >=0),
    taxPercentage: Yup.number().required().default(30).test("taxRange", "Skatt må være mellom 0-100%", value => value >= 0 && value <= 100),
    offshorePremium: Yup.number().required().default(84,7),
    travelExpenses: Yup.number().default(0),
    overtimeOffshoreHours: Yup.number().default(0),
    safetyRepresentativeHours: Yup.number().default(0)
});

export default schema;



