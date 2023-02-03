import React, { useEffect, useState, useCallback } from "react";
import Row from "react-bootstrap/Row";
import schema from "../validations/schema";
import useValidate from "../validations/useValidate";
import calculations from "../calculate.js/calculate";

import Navigation from "../components/Navigation";
import FullForm from "../components/FullForm";

export default function MainScreen() {
  const [state, setState] = useState({
    keyValue: Date.now(),
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
    clubDeduction: 0,
    travelExpenses: 0,
    brutto: 0,
    employeeInsuranceCost: -39,
    errors: {},
  });

  const {
    offTime,
    offshorePremium,
    hourlyRate,
    taxPercentage,
    monthlySalary,
    netSalary,
    reducedAnnualWork,
    reducedAnnualWorkAmount,
    taxWithholding,
    overtimeOffshoreHours,
    totalOffshoreHours,
    overtimeBaseSalary,
    totalOffshorePremium,
    overtimeExtraPercentage,
    grossTotal,
    safetyRepresentativeHours,
    srAmount,
    unionFees,
    unionName,
    clubDeduction,
    travelExpenses,
    brutto,
    keyValue,
    employeeInsuranceCost,
  } = state;

  const { errors, isValid, validate } = useValidate(schema);

  const useCalculation = (name) => {
    const calculation = calculations[name];
    return useCallback(() => calculation(state), [calculation, state]);
  };

  const calculateMonthlySalary = useCalculation("monthlySalary", hourlyRate);
  const calculateReducedAnnualWorkAmount = useCalculation(
    "reducedAnnualWork",
    reducedAnnualWork,
    hourlyRate
  );
  const calculateReducedAnnualWork = useCalculation(
    "reducedAnnualWorkAmount",
    offTime
  );

  const calculateSRAmount = useCalculation(
    "SRAmount",
    safetyRepresentativeHours
  );
  const calculateOvertimeBaseSalary = useCalculation(
    "overtimeBaseSalary",
    hourlyRate,
    overtimeOffshoreHours
  );
  const calculateOvertimeExtraPercentage = useCalculation(
    "overtimeExtraPercentage",
    overtimeBaseSalary
  );
  const calculateTotalOffshorePremium = useCalculation(
    "totalOffshorePremium",
    offshorePremium,
    totalOffshoreHours
  );
  const calculateTaxWithholding = useCalculation(
    "taxWithholding",
    brutto,
    taxPercentage
  );
  const calculateTotalOffshoreHours = useCalculation(
    "totalOffshoreHours",
    offTime,
    overtimeOffshoreHours
  );
  const calculateGrossTotal = useCalculation("grossTotal", brutto);
  const calculateUnionFees = useCalculation(
    "unionFees",
    brutto,
    travelExpenses,
    unionName
  );
  const calculateBrutto = useCalculation(
    "calculateSalary",
    monthlySalary,
    reducedAnnualWorkAmount,
    overtimeBaseSalary,
    overtimeExtraPercentage,
    totalOffshorePremium,
    srAmount,
    travelExpenses
  );
  const calculateNetSalary = useCalculation(
    "calculateNetSalary",
    grossTotal,
    taxWithholding,
    clubDeduction,
    employeeInsuranceCost,
    unionFees
  );

  const setUnionName = (newValue) => {
    setState((prevState) => ({
      ...prevState,
      unionName: newValue,
    }));
  };

  const calculateSalary = useCallback(() => {
    setState((prevState) => ({
      ...prevState,

      monthlySalary: calculateMonthlySalary(),
      reducedAnnualWork: calculateReducedAnnualWork(),
      srAmount: calculateSRAmount(),
      overtimeBaseSalary: calculateOvertimeBaseSalary(),
      overtimeExtraPercentage: calculateOvertimeExtraPercentage(),
      totalOffshorePremium: calculateTotalOffshorePremium(),
      taxWithholding: calculateTaxWithholding(),
      totalOffshoreHours: calculateTotalOffshoreHours(),
      grossTotal: calculateGrossTotal(),
      unionFees: calculateUnionFees(),
      netSalary: calculateNetSalary(),
      reducedAnnualWorkAmount: calculateReducedAnnualWorkAmount(),
      brutto: calculateBrutto(),
    }));
  }, [
    calculateBrutto,
    calculateGrossTotal,
    calculateMonthlySalary,
    calculateNetSalary,
    calculateOvertimeBaseSalary,
    calculateOvertimeExtraPercentage,
    calculateSRAmount,
    calculateReducedAnnualWork,
    calculateReducedAnnualWorkAmount,
    calculateTaxWithholding,
    calculateTotalOffshoreHours,
    calculateTotalOffshorePremium,
    calculateUnionFees,
  ]);

  //check unionName

  useEffect(() => {
    calculateSalary();
  }, [
    netSalary,
    offTime,
    offshorePremium,
    hourlyRate,
    taxPercentage,
    monthlySalary,
    reducedAnnualWork,
    reducedAnnualWorkAmount,
    taxWithholding,
    overtimeOffshoreHours,
    totalOffshoreHours,
    overtimeBaseSalary,
    totalOffshorePremium,
    overtimeExtraPercentage,
    grossTotal,
    safetyRepresentativeHours,
    srAmount,
    unionFees,
    unionName,
    clubDeduction,
    travelExpenses,
    brutto,
    errors,
    keyValue,
    unionName,
  ]);

  /* Validations */

  const fields = {
    offTime: {
      setter: (value) => setState((state) => ({ ...state, offTime: value })),
      validator: validate,
    },
    hourlyRate: {
      setter: (value) => setState((state) => ({ ...state, hourlyRate: value })),
      validator: validate,
    },
    taxPercentage: {
      setter: (value) =>
        setState((state) => ({ ...state, taxPercentage: value })),
      validator: validate,
    },
    overtimeOffshoreHours: {
      setter: (value) =>
        setState((state) => ({ ...state, overtimeOffshoreHours: value })),
      validator: validate,
    },
    offshorePremium: {
      setter: (value) =>
        setState((state) => ({ ...state, offshorePremium: value })),
      validator: validate,
    },
    travelExpenses: {
      setter: (value) =>
        setState((state) => ({ ...state, travelExpenses: value })),
      validator: validate,
    },
    safetyRepresentativeHours: {
      setter: (value) =>
        setState((state) => ({ ...state, safetyRepresentativeHours: value })),
      validator: validate,
    },
    netSalary: {
      setter: (value) => setState((state) => ({ ...state, netSalary: value })),
      validator: validate,
    },
  };

  const handleValidation = (field, value) => {
    const newValue = value || 0; // check if value is falsy, if so set to 0
    setState((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
    fields[field].validator({ [field]: newValue });
  };

  /* const handleRender = () => {
    setKeyValue(keyValue + 1);
  }; */

  

  return (
    <div
      className="small-container"
      style={{
        marginTop: "10px",
        border: "solid 2px",
        backgroundColor: "#E0E0E0",
      }}
    >
      <Navigation />
      <Row style={{ margin: "auto", marginTop: "10px" }}>
        <FullForm
          formData={state}
          handleValidation={handleValidation}
          errors={errors}
          setUnionName={setUnionName}
        />
      </Row>
    </div>
  );
}
