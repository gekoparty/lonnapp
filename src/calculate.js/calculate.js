const calculations = {
  monthlySalary: (state) => 162.5 * state.hourlyRate,
  reducedAnnualWorkAmount: (state) => (state.offTime / 168) * 15.68,
  reducedAnnualWork: (state) =>
    -parseFloat((state.reducedAnnualWork * state.hourlyRate).toFixed(2)),
  SRAmount: (state) => state.safetyRepresentativeHours * 15,
  overtimeBaseSalary: (state) => state.overtimeOffshoreHours * state.hourlyRate,
  overtimeExtraPercentage: (state) => state.overtimeBaseSalary,
  totalOffshorePremium: (state) =>
    state.offshorePremium * state.totalOffshoreHours,
  taxWithholding: (state) => -(state.brutto * state.taxPercentage) / 100,
  totalOffshoreHours: (state) => state.offTime + state.overtimeOffshoreHours,
  grossTotal: (state) => state.brutto,
  unionFees: (state) => {
    switch (state.unionName) {
      case "FF":
        return -((state.brutto - state.travelExpenses) * 1.5) / 100;
      case "Safe":
        return -460;
      case "Parat":
        return -520;
      default:
        return 0;
    }
  },
  calculateNetSalary: (state) =>
    state.grossTotal +
    state.taxWithholding +
    state.clubDeduction +
    state.employeeInsuranceCost +
    state.unionFees, 

  calculateSalary: (state) =>
    state.monthlySalary +
    state.reducedAnnualWorkAmount +
    state.overtimeBaseSalary +
    state.overtimeExtraPercentage +
    state.totalOffshorePremium +
    state.srAmount +
    state.travelExpenses,
};

export default calculations;
