import React, { useCallback, useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import schema from "../validations/schema";
import useValidate from "../validations/useValidate";

import Navigation from "../components/Navigation";
import FullForm from "../components/FullForm";

const initialFormState = {
  offTime: 168,
  offshorePremium: 84.7,
  hourlyRate: 231,
  taxPercentage: 30,
  overtimeOffshoreHours: 0,
  safetyRepresentativeHours: 0,
  unionName: "FF",
  employeeType: "operator",
  clubDeduction: 0,
  travelExpenses: 0,
  holidayWorkDays: 0,
  holidayWorkHours: 12,
  waitingTimeOffshore: 0,
  tankAllowance: 0,
  dirtAllowance: 0,
  employeeInsuranceCost: -39,
};

const calculateSalaryValues = ({
  offTime,
  offshorePremium,
  hourlyRate,
  taxPercentage,
  overtimeOffshoreHours,
  safetyRepresentativeHours,
  unionName,
  employeeType,
  clubDeduction,
  travelExpenses,
  holidayWorkDays,
  holidayWorkHours,
  waitingTimeOffshore,
  tankAllowance,
  dirtAllowance,
  employeeInsuranceCost,
}) => {
  const monthlySalary = 162.5 * hourlyRate;
  const reducedAnnualWork = (offTime / 168) * 15.68;
  const reducedAnnualWorkAmount =
    employeeType === "leader"
      ? 0
      : -parseFloat((reducedAnnualWork * hourlyRate).toFixed(2));
  const srAmount = safetyRepresentativeHours * 15;
  const overtimeBaseSalary = overtimeOffshoreHours * hourlyRate;
  const overtimeExtraPercentage = overtimeBaseSalary;
  const totalOffshoreHours = offTime + overtimeOffshoreHours;
  const totalOffshorePremium = offshorePremium * totalOffshoreHours;
  const holidayPremium100 = holidayWorkDays * holidayWorkHours * hourlyRate;
  const holidayAllowance75 = holidayWorkDays * 7.5 * hourlyRate;
  const holidayCompensation = holidayPremium100 + holidayAllowance75;
  const brutto =
    monthlySalary +
    reducedAnnualWorkAmount +
    overtimeBaseSalary +
    overtimeExtraPercentage +
    totalOffshorePremium +
    srAmount +
    travelExpenses +
    holidayCompensation +
    waitingTimeOffshore +
    tankAllowance +
    dirtAllowance;
  const grossTotal = brutto;
  const taxWithholding = -(brutto * taxPercentage) / 100;
  const unionFees = (() => {
    switch (unionName) {
      case "FF":
        return -((brutto - travelExpenses) * 1.5) / 100;
      case "Safe":
        return -460;
      case "Parat":
        return -520;
      case "Ledere":
        return -220;
      default:
        return 0;
    }
  })();
  const netSalary =
    grossTotal +
    taxWithholding +
    clubDeduction +
    employeeInsuranceCost +
    unionFees;

  return {
    monthlySalary,
    netSalary,
    reducedAnnualWork,
    reducedAnnualWorkAmount,
    taxWithholding,
    totalOffshoreHours,
    overtimeBaseSalary,
    totalOffshorePremium,
    overtimeExtraPercentage,
    grossTotal,
    srAmount,
    holidayPremium100,
    holidayAllowance75,
    holidayCompensation,
    unionFees,
    brutto,
  };
};

export default function MainScreen() {
  const [formState, setFormState] = useState(initialFormState);
  const { errors, validate } = useValidate(schema);
  const salaryValues = useMemo(
    () => calculateSalaryValues(formState),
    [formState]
  );
  const formData = useMemo(
    () => ({
      ...formState,
      ...salaryValues,
    }),
    [formState, salaryValues]
  );

  const setUnionName = useCallback((newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      unionName: newValue,
    }));
  }, []);

  const setEmployeeType = useCallback((newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      employeeType: newValue,
    }));
  }, []);

  const handleValidation = useCallback((field, value) => {
    const newValue = value ?? 0;
    const nextState = {
      ...formState,
      [field]: newValue,
    };

    setFormState(nextState);
    validate(nextState);
  }, [formState, validate]);

  return (
    <div className="app-shell">
      <main className="calculator-shell">
        <Navigation />
        <section className="calculator-card">
          <Row className="calculator-grid">
            <FullForm
              formData={formData}
              handleValidation={handleValidation}
              errors={errors}
              setUnionName={setUnionName}
              setEmployeeType={setEmployeeType}
            />
          </Row>
        </section>
      </main>
    </div>
  );
}
