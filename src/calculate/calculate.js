const calculations = {
    monthlySalary: (hourlyRate) => 162.5 * hourlyRate,
    reducedAnnualWorkAmount: (offTime) =>
    (offTime / 168) * 15.68,
    reducedAnnualWork: (reducedAnnualWork, hourlyRate) =>
    
      -parseFloat((reducedAnnualWork * hourlyRate).toFixed(2)),
    SRAmount: (safetyRepresentativeHours) => safetyRepresentativeHours * 15,
    overtimeBaseSalary: (hourlyRate, overtimeOffshoreHours) =>
      overtimeOffshoreHours * hourlyRate,
    overtimeExtraPercentage: (overtimeBaseSalary) => overtimeBaseSalary,
    totalOffshorePremium: (offshorePremium, totalOffshoreHours) =>
      offshorePremium * totalOffshoreHours,
    taxWithholding: (brutto, taxPercentage) => -(brutto * taxPercentage) / 100,
    totalOffshoreHours: (offTime, overtimeOffshoreHours) =>
      offTime + overtimeOffshoreHours,
    grossTotal: (brutto) => brutto,
    unionFees: (brutto, travelExpenses, unionName) => {
      switch (unionName) {
        case "FF":
          return -((brutto - travelExpenses) * 1.5) / 100;
        case "Safe":
          return -460;
        case "Parat":
          return -520;
        default:
          return 0;
      }
    },
    calculateNetSalary: (
      grossTotal,
      taxWithholding,
      clubDeduction,
      employeeInsuranceCost,
      unionFees
    ) => {
      return (
        grossTotal +
        taxWithholding +
        clubDeduction +
        employeeInsuranceCost +
        unionFees
      );
    },
    calculateSalary: (
      monthlySalary,
      reducedAnnualWorkAmount,
      overtimeBaseSalary,
      overtimeExtraPercentage,
      totalOffshorePremium,
      srAmount,
      travelExpenses
    ) =>
      monthlySalary +
      reducedAnnualWorkAmount +
      overtimeBaseSalary +
      overtimeExtraPercentage +
      totalOffshorePremium +
      srAmount +
      travelExpenses,
  };

  export default calculations;