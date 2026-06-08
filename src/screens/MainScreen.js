import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import schema from "../validations/schema";
import useValidate from "../validations/useValidate";

import Navigation from "../components/Navigation";
import FullForm from "../components/FullForm";

export default function MainScreen() {
  const [state, setState] = useState({
    offTime: 168,
    offshorePremium: 84.7,
    hourlyRate: 231,
    taxPercentage: 30,
    monthlySalary: 0,
    netSalary: 0,
    reducedAnnualWork: 0,
    reducedAnnualWorkAmount: 0,
    taxWithholding: 0,
    overtimeOffshoreHours: 0,
    totalOffshoreHours: 0,
    overtimeBaseSalary: 0,
    totalOffshorePremium: 0,
    overtimeExtraPercentage: 0,
    grossTotal: 0,
    safetyRepresentativeHours: 0,
    srAmount: 0,
    unionFees: 0,
    unionName: "FF",
    employeeType: "operator",
    clubDeduction: 0,
    travelExpenses: 0,
    brutto: 0,
    employeeInsuranceCost: -39,
  });

  const {
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
    employeeInsuranceCost,
  } = state;

  const { errors, validate } = useValidate(schema);

  const setUnionName = (newValue) => {
    setState((prevState) => ({
      ...prevState,
      unionName: newValue,
    }));
  };

  const setEmployeeType = (newValue) => {
    setState((prevState) => ({
      ...prevState,
      employeeType: newValue,
    }));
  };

  useEffect(() => {
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
    const brutto =
      monthlySalary +
      reducedAnnualWorkAmount +
      overtimeBaseSalary +
      overtimeExtraPercentage +
      totalOffshorePremium +
      srAmount +
      travelExpenses;
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

    setState((prevState) => ({
      ...prevState,
      monthlySalary,
      reducedAnnualWork,
      reducedAnnualWorkAmount,
      srAmount,
      overtimeBaseSalary,
      overtimeExtraPercentage,
      totalOffshorePremium,
      taxWithholding,
      totalOffshoreHours,
      grossTotal,
      unionFees,
      netSalary,
      brutto,
    }));
  }, [
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
    employeeInsuranceCost,
  ]);

  const handleValidation = (field, value) => {
    const newValue = value ?? 0;
    const nextState = {
      ...state,
      [field]: newValue,
    };

    setState(nextState);
    validate(nextState);
  };

  return (
    <div className="app-shell">
      <main className="calculator-shell">
        <Navigation />
        <section className="calculator-card">
          <Row className="calculator-grid">
            <FullForm
              formData={state}
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
