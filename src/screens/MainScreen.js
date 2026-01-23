import React, { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
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
    offshorePremium: 105.39,
    hourlyRate: 291.91,
    taxPercentage: 29,
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
    øvelseHours: 0,
    offshoreDays: 0,
    taxableBenefits: 0,
    øvelseAmount: 0,
    position: "operatør",
    employeeInsuranceCost: -39,
    errors: {},
  });

  const {
    offTime,
    offshorePremium,
    hourlyRate,
    taxPercentage,
    overtimeOffshoreHours,
    safetyRepresentativeHours,
    unionName,
    clubDeduction,
    travelExpenses,
    keyValue,
    employeeInsuranceCost,
    øvelseHours,
    offshoreDays,
    position,
  } = state;

  const { errors, validate } = useValidate(schema);

  const setUnionName = (newValue) =>
    setState((prev) => ({ ...prev, unionName: newValue }));

  const setPosition = (newValue) =>
    setState((prev) => ({ ...prev, position: newValue }));

  // Single calculate function that computes derived values in safe order
  const calculateAll = useCallback(() => {
    setState((prev) => {
      const s = { ...prev }; // snapshot

      // compute components using calculation helpers (safe numeric inside calculations)
      const monthlySalary = calculations.monthlySalary(s);
      const reducedAnnualWorkAmount = calculations.reducedAnnualWorkAmount(s);
      const reducedAnnualWork = calculations.reducedAnnualWork(s);
      const srAmount = calculations.SRAmount(s);
      const overtimeBaseSalary = calculations.overtimeBaseSalary(s);
      const overtimeExtraPercentage = calculations.overtimeExtraPercentage(s);
      const totalOffshoreHours = calculations.totalOffshoreHours(s);
      const totalOffshorePremium = calculations.totalOffshorePremium(s);
      const ovelseAmount = calculations.øvelseAmount(s);
      const taxableBenefits = calculations.taxableBenefits(s);

      // build a temp state for brutto calculation (include just-calculated parts)
      const temp = {
        ...s,
        monthlySalary,
        reducedAnnualWorkAmount,
        reducedAnnualWork,
        srAmount,
        overtimeBaseSalary,
        overtimeExtraPercentage,
        totalOffshoreHours,
        totalOffshorePremium,
        øvelseAmount: ovelseAmount,
        taxableBenefits,
      };

      // compute brutto (salary total)
      const brutto = calculations.calculateSalary(temp);

      // compute tax and other final values using the up-to-date brutto
      const taxWithholding = calculations.taxWithholding({ ...temp, brutto });
      const unionFees = calculations.unionFees({ ...temp, brutto });
      const grossTotal = calculations.grossTotal({ ...temp, brutto });
      const netSalary = calculations.calculateNetSalary({
        ...temp,
        brutto,
        taxWithholding,
        unionFees,
        grossTotal,
      });

      return {
        ...s,
        monthlySalary,
        reducedAnnualWorkAmount,
        reducedAnnualWork,
        srAmount,
        overtimeBaseSalary,
        overtimeExtraPercentage,
        totalOffshoreHours,
        totalOffshorePremium,
        øvelseAmount: ovelseAmount,
        taxableBenefits,
        brutto,
        grossTotal,
        taxWithholding,
        unionFees,
        netSalary,
      };
    });
  }, []);

  // Recalculate when any input field that affects salary changes.
  useEffect(() => {
    calculateAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    offTime,
    offshorePremium,
    hourlyRate,
    taxPercentage,
    overtimeOffshoreHours,
    travelExpenses,
    safetyRepresentativeHours,
    unionName,
    clubDeduction,
    employeeInsuranceCost,
    øvelseHours,
    offshoreDays,
    position,
    keyValue,
  ]);

  // Fields for validation handlers (add offshoreDays & øvelseHours here)
  const fields = {
    offTime: {
      setter: (value) => setState((s) => ({ ...s, offTime: value })),
      validator: validate,
    },
    hourlyRate: {
      setter: (value) => setState((s) => ({ ...s, hourlyRate: value })),
      validator: validate,
    },
    taxPercentage: {
      setter: (value) => setState((s) => ({ ...s, taxPercentage: value })),
      validator: validate,
    },
    overtimeOffshoreHours: {
      setter: (value) =>
        setState((s) => ({ ...s, overtimeOffshoreHours: value })),
      validator: validate,
    },
    offshorePremium: {
      setter: (value) => setState((s) => ({ ...s, offshorePremium: value })),
      validator: validate,
    },
    travelExpenses: {
      setter: (value) => setState((s) => ({ ...s, travelExpenses: value })),
      validator: validate,
    },
    safetyRepresentativeHours: {
      setter: (value) =>
        setState((s) => ({ ...s, safetyRepresentativeHours: value })),
      validator: validate,
    },
    øvelseHours: {
      setter: (value) => setState((s) => ({ ...s, øvelseHours: value })),
      validator: validate,
    },
    offshoreDays: {
      setter: (value) => setState((s) => ({ ...s, offshoreDays: value })),
      validator: validate,
    },
  };

  const handleValidation = (field, value) => {
    // ensure numeric fields are numbers; store 0 for falsy
    const newValue =
      value === "" || value === null || typeof value === "undefined"
        ? 0
        : value;
    setState((prev) => ({ ...prev, [field]: newValue }));
    if (fields[field]) fields[field].validator({ [field]: newValue });
  };

  return (
    <>
      <Navigation />
      <Container
        fluid="md"
        className="d-flex justify-content-center"
        style={{ marginTop: "20px", marginBottom: "40px" }}
      >
        <Card
          className="shadow-lg p-4 w-100"
          style={{ maxWidth: "1200px" }}
        >
          <Card.Header
            as="h4"
            className="text-center bg-dark text-white rounded"
          >
            Lønnskalkulator
          </Card.Header>
          <Card.Body>
            <Row>
              <FullForm
                formData={state}
                handleValidation={handleValidation}
                errors={errors}
                setUnionName={setUnionName}
                setPosition={setPosition}
              />
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
