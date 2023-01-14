import * as Yup from 'yup';

const schema = Yup.object().shape({
    offTime: Yup.number().required().default(168),
    hourlyRate: Yup.number().required().default(220),
    taxPercentage: Yup.number().required().default(30).moreThan(-1, "Kan ikke være negativt tall").max(100, 'Skatt kan ikke over 100%'),
    offshorePremium: Yup.number().required().default(84,7),
    travelExpenses: Yup.number().default(0),
    overtimeOffshoreHours: Yup.number().default(0),
    safetyRepresentativeHours: Yup.number().default(0)
});

export default schema;



