import React, { useEffect, useState, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import schema from "../validations/schema";
import useValidate from "../validations/useValidate";
import calculations from "../calculate.js/calculate";
import FormRadio from "../components/FormRadio";
import FormDisplay from "../components/FormDisplay";

export default function MainScreen() {
  const [offTime, setOffTime] = useState(168);

  const [offshorePremium, setOffshorePremium] = useState(84.7);
  const [hourlyRate, setHourlyRate] = useState(220);
  const [taxPercentage, setTaxPercentage] = useState(30);

  const [monthlySalary, setMonthlySalary] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [reducedAnnualWork, setReducedAnnualWork] = useState(0);
  const [reducedAnnualWorkAmount, setReducedAnnualWorkAmount] = useState(0);
  const [taxWithholding, setTaxWithholding] = useState(0);
  const [overtimeOffshoreHours, setOvertimeOffshoreHours] = useState(0);
  const [totalOffshoreHours, setTotalOffshoreHours] = useState(0);
  const [overtimeBaseSalary, setOvertimeBaseSalary] = useState(0);
  const [totalOffshorePremium, setTotalOffshorePremium] = useState(0);
  const [overtimeExtraPercentage, setOvertimeExtraPercentage] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [safetyRepresentativeHours, setSafetyRepresentativeHours] = useState(0);
  const [srAmount, setSrAmount] = useState(0);
  const [unionFees, setUnionFees] = useState(0);
  const [unionName, setUnionName] = useState("FF");
  const [clubDeduction, setClubDeduction] = useState(0);
  const [travelExpenses, setTravelExpenses] = useState(0);
  const { errors, isValid, validate } = useValidate(schema);
  const [brutto, setBrutto] = useState(0);

  const employeeInsuranceCost = -39;

  const useCalculation = (name, ...params) => {
    const calculation = calculations[name];
    return useCallback(() => calculation(...params), [calculation, ...params]);
  };

  const calculateMonthlySalary = useCalculation("monthlySalary", hourlyRate);
  const calculateReducedAnnualWorkAmount = useCalculation(
    "reducedAnnualWorkAmount",
    offTime
  );
  const calculateReducedAnnualWork = useCalculation(
    "reducedAnnualWork",
    reducedAnnualWork,
    hourlyRate
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

  const calculateSalary = useCallback(() => {
    setBrutto(calculateBrutto());
    setMonthlySalary(calculateMonthlySalary());
    setReducedAnnualWork(calculateReducedAnnualWorkAmount());
    setReducedAnnualWorkAmount(calculateReducedAnnualWork());
    setSrAmount(calculateSRAmount());
    setOvertimeBaseSalary(calculateOvertimeBaseSalary());
    setOvertimeExtraPercentage(calculateOvertimeExtraPercentage());
    setTotalOffshorePremium(calculateTotalOffshorePremium());
    setTaxWithholding(calculateTaxWithholding());
    setTotalOffshoreHours(calculateTotalOffshoreHours());
    setGrossTotal(calculateGrossTotal());
    setUnionFees(calculateUnionFees());
    setNetSalary(calculateNetSalary());
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
    calculateSalary,
    isValid,
    grossTotal,
    srAmount,
    totalOffshorePremium,
    safetyRepresentativeHours,
    monthlySalary,
    hourlyRate,
    offshorePremium,
    offTime,
    taxPercentage,
    reducedAnnualWork,
    reducedAnnualWorkAmount,
    taxWithholding,
    overtimeOffshoreHours,
    overtimeBaseSalary,
    overtimeExtraPercentage,
    totalOffshoreHours,
    unionFees,
    employeeInsuranceCost,
    clubDeduction,
    unionName,
    travelExpenses,
  ]);

  /* Validations */

  const fields = {
    offTime: { setter: setOffTime, validator: validate },
    hourlyRate: { setter: setHourlyRate, validator: validate },
    taxPercentage: { setter: setTaxPercentage, validator: validate },
    overtimeOffshoreHours: {
      setter: setOvertimeOffshoreHours,
      validator: validate,
    },
    offshorePremium: { setter: setOffshorePremium, validator: validate },
    travelExpenses: { setter: setTravelExpenses, validator: validate },
    safetyRepresentativeHours: {
      setter: setSafetyRepresentativeHours,
      validator: validate,
    },
  };

  const handleValidation = (field, value) => {
    const newValue = value || 0; // check if value is falsy, if so set to 0
    fields[field].setter(newValue);
    fields[field].validator({ [field]: newValue });
  };

  return (
    <div
      className="small-container"
      style={{
        marginTop: "10px",
        border: "solid 2px",
        backgroundColor: "#E0E0E0",
      }}
    >
      <Row style={{ margin: "auto", marginTop: "10px" }}>
        <Col lg={3}>
          <Form>
            <FormDisplay
              type={"numeric"}
              controlId={"timer"}
              label={"Off/Timer"}
              id={"offTime"}
              errors={errors}
              value={offTime}
              suffix={" T"}
              handleValidation={handleValidation}
            />
            <FormDisplay
              type={"numeric"}
              controlId={"overtimeOffshoreHours"}
              label={"Overtid Off"}
              id={"overtimeOffshoreHours"}
              errors={errors}
              suffix={" T"}
              handleValidation={handleValidation}
              value={overtimeOffshoreHours}
            />
            <FormDisplay
              type={"numeric"}
              label={"Off/Tillegg"}
              controlId={offshorePremium}
              min={0}
              id={"offshorePremium"}
              errors={errors}
              suffix={" Kr"}
              value={offshorePremium}
              handleValidation={handleValidation}
            />
            <FormDisplay
              type={"numeric"}
              controlId={"travelExpenses"}
              label={"Reise"}
              id={"travelExpenses"}
              errors={errors}
              value={travelExpenses}
              suffix={" Kr"}
              handleValidation={handleValidation}
            />

            <FormDisplay
              type={"numeric"}
              controlId={"lonn"}
              label={"Timesats"}
              id={"hourlyRate"}
              errors={errors}
              suffix={" Kr"}
              value={hourlyRate}
              handleValidation={handleValidation}
            />

            <FormDisplay
              type={"numeric"}
              controlId={"safetyHours"}
              label={"VO Timer"}
              id={"safetyRepresentativeHours"}
              errors={errors}
              suffix={" T"}
              value={safetyRepresentativeHours}
              handleValidation={handleValidation}
            />

            <FormDisplay
              type={"numeric"}
              controlId={"skatt"}
              label={"Skatt"}
              id={"taxPercentage"}
              errors={errors}
              suffix={" %"}
              value={taxPercentage}
              handleValidation={handleValidation}
            />

            <h4>Fagforening</h4>
            <div>
              <FormRadio
                onChange={(e) => setUnionName("FF")}
                label="FF"
                name="group1"
                type={"radio"}
                id="group1"
                defaultChecked
              />

              <FormRadio
                onChange={(e) => setUnionName("Safe")}
                label="Safe"
                name="group1"
                type={"radio"}
                id="group2"
              />

              <FormRadio
                onChange={(e) => setUnionName("Parat")}
                label="Parat"
                name="group1"
                type={"radio"}
                id="group3"
              />
              <FormRadio
                onChange={(e) => setUnionName("UO")}
                label="UO"
                name="group1"
                type={"radio"}
                id="group3"
              />
            </div>
          </Form>
        </Col>
        <Col lg={4}>
          <Form>
            <FormDisplay
              type={"text"}
              label={"Redusert Årsverk"}
              value={reducedAnnualWork}
              suffix={" T"}
              id={"reducedAnnualWork"}
            />
            <FormDisplay
              type={"text"}
              label={"Sum Timer"}
              value={totalOffshoreHours}
              suffix={" T"}
              id={"totalOffshoreHours"}
            />
          </Form>
        </Col>
        <Col md={3}>
          <Form>
            <FormDisplay
              type={"text"}
              value={monthlySalary}
              suffix={" Kr"}
              label={"Månedslønn"}
              id={"monthlySalary"}
            />
            {travelExpenses > 0 ? (
              <FormDisplay
                type={"text"}
                value={travelExpenses}
                suffix={" Kr"}
                label={"ReiseOpp"}
                id={"travelExpenses"}
              />
            ) : (
              ""
            )}

            {offTime > 0 ? (
              <FormDisplay
                type={"text"}
                value={reducedAnnualWorkAmount}
                suffix={" Kr"}
                label={"Beløp Red/Verk"}
                id={"reducedAnnualWorkAmount"}
              />
            ) : (
              ""
            )}
            {overtimeBaseSalary > 0 && (
              <FormDisplay
                value={overtimeBaseSalary}
                type={"text"}
                suffix={" Kr"}
                label={"Overtid Grunnlønn"}
                id={"overtimeBaseSalary"}
              />
            )}
            {overtimeExtraPercentage > 0 && (
              <FormDisplay
                value={overtimeExtraPercentage}
                label={"Overtid 100%"}
                type={"text"}
                suffix={" Kr"}
                decimalScale={2}
                id={"overtidEkstra100"}
              />
            )}
            {offTime > 0 ? (
              <FormDisplay
                value={totalOffshorePremium}
                label={"Off/Tillegg"}
                type={"text"}
                suffix={" Kr"}
                id={"offshoreTillegg"}
              />
            ) : (
              ""
            )}
            {srAmount > 0 ? (
              <FormDisplay
                value={srAmount}
                label={"Verneombud"}
                type={"text"}
                suffix={" Kr"}
                id={"srAmount"}
              />
            ) : (
              ""
            )}
            <hr />
            <FormDisplay
              value={grossTotal}
              label={"Brutto"}
              type={"text"}
              suffix={" Kr"}
              id={"grossTotal"}
            />
            {unionFees !== 0 ? (
              <FormDisplay
                value={unionFees}
                label={"Fagforening"}
                type={"text"}
                suffix={" Kr"}
              />
            ) : (
              ""
            )}
            <FormDisplay
              value={employeeInsuranceCost}
              label={"Egenandel Fors"}
              type={"text"}
              suffix={" Kr"}
              id={"emplyeeInsuranceCos"}
            />
            {clubDeduction !== 0 ? (
              <FormDisplay
                value={clubDeduction}
                label={"Klubbtrekk"}
                type={"text"}
                suffix={" Kr"}
                id={"clubDeduction"}
              />
            ) : (
              ""
            )}
            <hr />
            <FormDisplay
              value={taxWithholding}
              type={"text"}
              label={"Skattetrekk"}
              suffix={" Kr"}
              id={"taxWithholding"}
            />
            <hr />
            <FormDisplay
              value={netSalary}
              type={"text"}
              label={"Netto Utbetalt"}
              suffix={" Kr"}
              id={"netSalary"}
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
}
