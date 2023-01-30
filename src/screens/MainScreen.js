import React, { useEffect, useState, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormResult from "../components/FormResult";
import schema from "../validations/schema";
import useValidate from "../validations/useValidate";
import { NumericFormat } from "react-number-format";
import calculations from "../calculate.js/calculate";
import FormNumeric from "../components/FormNumeric";

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
            <Form.Group as={Row} className="mb-3" controlId="timer">
              <Form.Label column>Off/Timer</Form.Label>
              <Col>
                <FormNumeric
                  id={"offTime"}
                  errors={errors}
                  value={offTime}
                  suffix={" T"}
                  handleValidation={handleValidation}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="overtimeOffshoreHours"
            >
              <Form.Label column>Overtid Off</Form.Label>
              <Col>
                <FormNumeric
                  id={"overtimeOffshoreHours"}
                  errors={errors}
                  suffix={" T"}
                  handleValidation={handleValidation}
                  value={overtimeOffshoreHours}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="offshorePremium">
              <Form.Label column>Off/tillegg</Form.Label>
              <Col>
                <FormNumeric
                  min={0}
                  id={"offshorePremium"}
                  errors={errors}
                  suffix={" Kr"}
                  value={offshorePremium}
                  handleValidation={handleValidation}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="travelExpenses">
              <Form.Label column>Reise</Form.Label>
              <Col>
                <FormNumeric
                  id={"travelExpenses"}
                  errors={errors}
                  value={travelExpenses}
                  suffix={" Kr"}
                  handleValidation={handleValidation}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lonn">
              <Form.Label column>TimeSats</Form.Label>
              <Col>
                <FormNumeric
                  id={"hourlyRate"}
                  errors={errors}
                  suffix={" Kr"}
                  value={hourlyRate}
                  handleValidation={handleValidation}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="safetyHours">
              <Form.Label column>VO Timer</Form.Label>
              <Col>
                <FormNumeric
                  id={"safetyRepresentativeHours"}
                  errors={errors}
                  suffix={" T"}
                  value={safetyRepresentativeHours}
                  handleValidation={handleValidation}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="skatt">
              <Form.Label column>Skatt</Form.Label>
              <Col>
                <FormNumeric
                  id={"taxPercentage"}
                  errors={errors}
                  suffix={" %"}
                  value={taxPercentage}
                  handleValidation={handleValidation}
                />
              </Col>
            </Form.Group>

            <h4>Fagforening</h4>
            <div>
              <Form.Check
                inline
                defaultChecked
                onChange={(e) => setUnionName("FF")}
                label="FF"
                name="group1"
                type={"radio"}
                id="group1"
              />
              <Form.Check
                inline
                onChange={(e) => setUnionName("Safe")}
                label="Safe"
                name="group1"
                type={"radio"}
                id="group2"
              />
              <Form.Check
                inline
                onChange={(e) => setUnionName("Parat")}
                label="Parat"
                name="group1"
                type={"radio"}
                id="group3"
              />
              <Form.Check
                inline
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
          {/* <h4>Netto Utbetalt</h4>
          <div>{netSalary}</div> */}
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="skatt">
              <Form.Label column>Redusert Årsverk</Form.Label>
              <Col>
                <NumericFormat
                  customInput={Form.Control}
                  type={"text"}
                  decimalScale={2}
                  className="bg-light"
                  //type="number"
                  value={reducedAnnualWork}
                  disabled
                ></NumericFormat>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="sumTimer">
              <Form.Label column>Sum Timer</Form.Label>
              <Col>
                <NumericFormat
                  customInput={Form.Control}
                  type={"text"}
                  decimalScale={2}
                  className="bg-light"
                  //type="number"
                  value={totalOffshoreHours}
                  disabled
                ></NumericFormat>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col md={3}>
          <Form>
            <NumericFormat
              displayType={"text"}
              thousandSeparator={true}
              value={monthlySalary}
              suffix={" Kr"}
              fixedDecimalScale={false}
              decimalScale={2}
              renderText={(value) => (
                <FormResult
                  type={""}
                  label={"Månedslønn"}
                  id={"monthlySalary"}
                  value={value}
                  readOnly={true}
                />
              )}
            />
            {travelExpenses > 0 ? (
              <NumericFormat
                displayType={"text"}
                thousandSeparator={true}
                value={travelExpenses}
                suffix={" Kr"}
                fixedDecimalScale={false}
                decimalScal={2}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"ReiseOpp"}
                    id={"ReiseOpp"}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            ) : (
              ""
            )}

            {offTime > 0 ? (
              <NumericFormat
                displayType={"text"}
                thousandSeparator={true}
                value={reducedAnnualWorkAmount}
                suffix={" Kr"}
                fixedDecimalScale={false}
                decimalScale={2}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"Beløp Red/Verk"}
                    id={"reducedAnnualWorkAmount"}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            ) : (
              ""
            )}
            {overtimeBaseSalary > 0 && (
              <NumericFormat
                value={overtimeBaseSalary}
                thousandSeparator={true}
                displayType={"text"}
                suffix={" Kr"}
                decimalScale={2}
                fixedDecimalScale={false}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"Overtid Grunnlonn"}
                    id={"overtimeBaseSalary"}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            )}
            {overtimeExtraPercentage > 0 && (
              <NumericFormat
                value={overtimeExtraPercentage}
                thousandSeparator={true}
                displayType={"text"}
                suffix={" Kr"}
                decimalScale={2}
                fixedDecimalScale={false}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"Overtid 100%"}
                    id={"overtidEkstra100"}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            )}
            {offTime > 0 ? (
              <NumericFormat
                value={totalOffshorePremium}
                thousandSeparator={true}
                displayType={"text"}
                suffix={" Kr"}
                decimalScale={2}
                fixedDecimalScale={false}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"Off/Tillegg"}
                    id={"offshoretillegg"}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            ) : (
              ""
            )}
            {srAmount > 0 ? (
              <NumericFormat
                value={srAmount}
                thousandSeparator={true}
                displayType={"text"}
                suffix={" Kr"}
                decimalScale={2}
                fixedDecimalScale={false}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"Verneombud"}
                    id={"srAmount"}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            ) : (
              ""
            )}
            <hr />
            <NumericFormat
              value={grossTotal}
              thousandSeparator={true}
              displayType={"text"}
              suffix={" Kr"}
              decimalScale={2}
              fixedDecimalScale={false}
              renderText={(value) => (
                <FormResult
                  type={""}
                  label={"Brutto"}
                  id={"grossTotal"}
                  value={value}
                  readOnly={true}
                />
              )}
            />
            {unionFees !== 0 ? (
              <NumericFormat
                value={unionFees}
                thousandSeparator={true}
                displayType={"text"}
                suffix={" Kr"}
                decimalScale={2}
                fixedDecimalScale={true}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"Fagforening"}
                    id={"unionName"}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            ) : (
              ""
            )}
            <NumericFormat
              value={employeeInsuranceCost}
              thousandSeparator={true}
              displayType={"text"}
              suffix={" Kr"}
              decimalScale={2}
              fixedDecimalScale={false}
              renderText={(value) => (
                <FormResult
                  type={""}
                  label={"Egenandel Fors"}
                  id={"employeeInsuranceCos"}
                  value={value}
                  readOnly={true}
                />
              )}
            />
            {clubDeduction !== 0 ? (
              <NumericFormat
                value={clubDeduction}
                thousandSeparator={true}
                displayType={"text"}
                suffix={" Kr"}
                decimalScale={2}
                fixedDecimalScale={false}
                renderText={(value) => (
                  <FormResult
                    type={""}
                    label={"Klubbtrekk"}
                    id={clubDeduction}
                    value={value}
                    readOnly={true}
                  />
                )}
              />
            ) : (
              ""
            )}
            <hr />
            <NumericFormat
              value={taxWithholding}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" Kr"}
              decimalScale={2}
              fixedDecimalScale={false}
              renderText={(value) => (
                <FormResult
                  type={""}
                  label={"Skattetrekk"}
                  id="taxWithholding"
                  value={value}
                  readOnly={true}
                />
              )}
            />
            <hr />
            <NumericFormat
              value={netSalary}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" Kr"}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value) => (
                <FormResult
                  type={""}
                  label={"Netto Utbetalt"}
                  id={"netSalary"}
                  value={value}
                  readOnly={true}
                />
              )}
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
}
