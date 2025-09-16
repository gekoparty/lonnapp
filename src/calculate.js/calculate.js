const isEligibleForReducedWork = (position) => position === "operatør";

const calculations = {
  monthlySalary: (state) => 162.5 * state.hourlyRate,

  // === REDUCED ANNUAL WORK ===
  reducedAnnualWork: (state) =>
    isEligibleForReducedWork(state.position)
      ? (state.offTime / 168) * 15.68
      : 0,

  reducedAnnualWorkAmount: (state) =>
    isEligibleForReducedWork(state.position)
      ? -((state.offTime / 168) * 15.68) * state.hourlyRate
      : 0,

  // === OTHER EARNINGS ===
  SRAmount: (state) => state.safetyRepresentativeHours * 15,

  overtimeBaseSalary: (state) => state.overtimeOffshoreHours * state.hourlyRate,
  overtimeExtraPercentage: (state) => state.overtimeBaseSalary,

  totalOffshoreHours: (state) =>
    state.offTime + state.overtimeOffshoreHours,

  totalOffshorePremium: (state) =>
    state.offshorePremium * state.totalOffshoreHours,

  øvelseAmount: (state) =>
    state.øvelseHours * (state.hourlyRate + state.offshorePremium),

  taxableBenefits: (state) =>
    state.offshoreDays * (state.taxableBenefitRate || 10.44),

  // === SALARY SUMS ===
  grossTotal: (state) => state.brutto,

  skattegrunnlag: (state) =>
    state.brutto + calculations.taxableBenefits(state),

  taxWithholding: (state) =>
    -(calculations.skattegrunnlag(state) * state.taxPercentage) / 100,

  unionFees: (state) => {
    switch (state.unionName) {
      case "FF":
        return -((state.brutto - state.travelExpenses) * 1.5) / 100;
      case "Safe":
        return -460;
      case "Parat":
        return -520;
      case "Lederne":
        return -735;
      default:
        return 0;
    }
  },

  calculateSalary: (state) =>
    calculations.monthlySalary(state) +
    calculations.reducedAnnualWorkAmount(state) +
    calculations.overtimeBaseSalary(state) +
    calculations.overtimeExtraPercentage(state) +
    calculations.totalOffshorePremium(state) +
    calculations.SRAmount(state) +
    state.travelExpenses +
    calculations.øvelseAmount(state),

  calculateNetSalary: (state) =>
    calculations.calculateSalary(state) +
    calculations.taxWithholding(state) +
    state.clubDeduction +
    state.employeeInsuranceCost +
    calculations.unionFees(state),
};

export default calculations;


