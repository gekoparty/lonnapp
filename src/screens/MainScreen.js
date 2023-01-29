import React, { useEffect, useReducer, useState, useCallback, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormInput from "../components/FormInput";
import schema from "../validations/schema";
import useValidate from "../validations/useValidate";
import { NumericFormat } from "react-number-format";

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

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

  const calculateMonthlySalary = useCallback(() => {
    return 162.5 * hourlyRate;
  }, [hourlyRate]);

  const calculateReducedAnnualWorkAmount = useCallback(() => {
    return parseFloat(((offTime * 9.332) / 100).toFixed(2));
  }, [offTime]);

  const calculateReducedAnnualWork = useCallback(() => {
    return -parseFloat((reducedAnnualWork * hourlyRate).toFixed(2));
  }, [reducedAnnualWork, hourlyRate]);

  const calculateSRAmount = useCallback(() => {
    return safetyRepresentativeHours * 15;
  }, [safetyRepresentativeHours]);

  const calculateOvertimeBaseSalary = useCallback(() => {
    return overtimeOffshoreHours * hourlyRate;
  }, [hourlyRate, overtimeOffshoreHours]);

  const calculateOvertimeExtraPercentage = useCallback(() => {
    return overtimeBaseSalary;
  }, [overtimeBaseSalary]);

  const calculateTotalOffshorePremium = useCallback(() => {
    return offshorePremium * totalOffshoreHours;
  }, [offshorePremium, totalOffshoreHours]);

  const calculateTaxWithholding = useCallback(() => {
    return -(brutto * taxPercentage) / 100;
  }, [brutto, taxPercentage]);

  const calculateTotalOffshoreHours = useCallback(() => {
    return offTime + overtimeOffshoreHours;
  }, [offTime, overtimeOffshoreHours]);

  const calculateGrossTotal = useCallback(() => {
    return brutto;
  }, [brutto]);

  const calculateUnionFees = useCallback(() => {
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
  }, [brutto, travelExpenses, unionName]);

  
  const calculateSalary = useCallback(() => {
    setBrutto(
      monthlySalary +
        reducedAnnualWorkAmount +
        overtimeBaseSalary +
        overtimeExtraPercentage +
        totalOffshorePremium +
        srAmount +
        travelExpenses
    );

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

    //check unionName
    if (unionName === "FF") {
      setUnionFees(-((brutto - travelExpenses) * 1.5) / 100);
    } else if (unionName === "Safe") {
      setUnionFees(-460);
      setClubDeduction(-40);
    } else if (unionName === "Parat") {
      setUnionFees(-520);
      setClubDeduction(-40);
    } else {
      setUnionFees(0);
      setClubDeduction(0);
    }

    setNetSalary(
      grossTotal +
        taxWithholding +
        clubDeduction +
        employeeInsuranceCost +
        unionFees
    );
  }, [
    brutto,
    calculateGrossTotal,
    calculateMonthlySalary,
    calculateOvertimeBaseSalary,
    calculateOvertimeExtraPercentage,
    calculateReducedAnnualWork,
    calculateReducedAnnualWorkAmount,
    calculateSRAmount,
    calculateTaxWithholding,
    calculateTotalOffshoreHours,
    calculateTotalOffshorePremium,
    calculateUnionFees,
    clubDeduction,
    employeeInsuranceCost,
    grossTotal,
    monthlySalary,
    overtimeBaseSalary,
    overtimeExtraPercentage,
    reducedAnnualWorkAmount,
    srAmount,
    taxWithholding,
    totalOffshorePremium,
    travelExpenses,
    unionFees,
    unionName,
  ]);

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
    fields[field].setter(value);
    fields[field].validator({ [field]: value });
  };

  return (
    <div
      className="small-container"
      style={{ marginTop: "10px", border: "solid 2px" }}
    >
      <Row style={{ margin: "auto", marginTop: "10px" }}>
        <Col lg={3}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="timer">
              <Form.Label column>Off/Timer</Form.Label>
              <Col>
                <NumericFormat
                  customInput={Form.Control}
                  min={0}
                  allowNegative={false}
                  className="bg-light"
                  //type="number"
                  isInvalid={!!errors.offTime}
                  defaultValue={offTime}
                  suffix={" T"}
                  onValueChange={(values) => {
                    console.log(values);
                    const { floatValue } = values;
                    console.log(floatValue);
                    handleValidation("offTime", floatValue);
                  }}
                  required
                ></NumericFormat>
                <Form.Control.Feedback type="invalid">
                  {errors.offTime}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="overtimeOffshoreHours"
            >
              <Form.Label column>Overtid Off</Form.Label>
              <Col>
                <NumericFormat
                  customInput={Form.Control}
                  allowNegative={false}
                  className="bg-light"
                  //type="number"
                  defaultValue={overtimeOffshoreHours}
                  suffix={" T"}
                  isInvalid={!!errors.overtimeOffshoreHours}
                  required
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleValidation("overtimeOffshoreHours", floatValue);
                  }}
                ></NumericFormat>
                <Form.Control.Feedback type="invalid">
                  {errors.overtimeOffshoreHours}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="offshorePremium">
              <Form.Label column>Off/tillegg</Form.Label>
              <Col>
                <NumericFormat
                  min={0}
                  allowNegative={false}
                  customInput={Form.Control}
                  className="bg-light"
                  suffix={" Kr"}
                  defaultValue={offshorePremium}
                  isInvalid={!!errors.offshorePremium}
                  required
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleValidation("offshorePremium", floatValue);
                  }}
                ></NumericFormat>
                <Form.Control.Feedback type="invalid">
                  {errors.offshorePremium}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="travelExpenses">
              <Form.Label column>Reise</Form.Label>
              <Col>
                <NumericFormat
                  min={0}
                  allowNegative={false}
                  customInput={Form.Control}
                  className="bg-light"
                  //type="number"
                  defaultValue={travelExpenses}
                  suffix={" Kr"}
                  isInvalid={!!errors.travelExpenses}
                  required
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleValidation("travelExpenses", floatValue);
                  }}
                ></NumericFormat>
                <Form.Control.Feedback type="invalid">
                  {errors.travelExpenses}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lonn">
              <Form.Label column>TimeSats</Form.Label>
              <Col>
                <NumericFormat
                  min={0}
                  allowNegative={false}
                  customInput={Form.Control}
                  //onKeyDown={(e) => e.key === "-" && e.preventDefault()}
                  className="bg-light "
                  defaultValue={hourlyRate}
                  suffix={" Kr"}
                  isInvalid={!!errors.hourlyRate}
                  required
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleValidation("hourlyRate", floatValue);
                  }}
                ></NumericFormat>
                <Form.Control.Feedback type="invalid">
                  {errors.hourlyRate}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="safetyHours">
              <Form.Label column>VO Timer</Form.Label>
              <Col>
                <NumericFormat
                  min={0}
                  allowNegative={false}
                  customInput={Form.Control}
                  className="bg-light "
                  //type="number"
                  defaultValue={safetyRepresentativeHours}
                  suffix={" T"}
                  isInvalid={!!errors.safetyRepresentativeHours}
                  required
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleValidation("safetyRepresentativeHours", floatValue);
                  }}
                ></NumericFormat>
                <Form.Control.Feedback type="invalid">
                  {errors.safetyRepresentativeHours}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="skatt">
              <Form.Label column>Skatt</Form.Label>
              <Col>
                <NumericFormat
                  min={0}
                  max={100}
                  allowNegative={false}
                  customInput={Form.Control}
                  //onKeyDown={(e) => e.key === "-" && e.preventDefault()}
                  className="bg-light"
                  //type="number"
                  isInvalid={!!errors.taxPercentage}
                  defaultValue={taxPercentage}
                  suffix={" %"}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleValidation("taxPercentage", floatValue);
                  }}
                  required
                ></NumericFormat>
                <Form.Control.Feedback type="invalid">
                  {errors.taxPercentage}
                </Form.Control.Feedback>
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
                <Form.Control
                  className="bg-light"
                  //type="number"
                  value={reducedAnnualWork}
                  disabled
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="sumTimer">
              <Form.Label column>Sum Timer</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light"
                  //type="number"
                  value={totalOffshoreHours}
                  disabled
                ></Form.Control>
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
                <FormInput
                  type={""}
                  label={"Månedslønn"}
                  id={"monthlySalary"}
                  value={value}
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
                  <FormInput
                    type={""}
                    label={"ReiseOpp"}
                    id={"ReiseOpp"}
                    value={value}
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
                  <FormInput
                    type={""}
                    label={"Beløp Red/Verk"}
                    id={"reducedAnnualWorkAmount"}
                    value={value}
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
                  <FormInput
                    type={""}
                    label={"Overtid Grunnlonn"}
                    id={"overtimeBaseSalary"}
                    value={value}
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
                  <FormInput
                    type={""}
                    label={"Overtid 100%"}
                    id={"overtidEkstra100"}
                    value={value}
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
                  <FormInput
                    type={""}
                    label={"Off/Tillegg"}
                    id={"offshoretillegg"}
                    value={value}
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
                  <FormInput
                    type={""}
                    label={"Verneombud"}
                    id={"srAmount"}
                    value={value}
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
                <FormInput
                  type={""}
                  label={"Brutto"}
                  id={"grossTotal"}
                  value={value}
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
                  <FormInput
                    type={""}
                    label={"Fagforening"}
                    id={"unionName"}
                    value={value}
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
                <FormInput
                  type={""}
                  label={"Egenandel Fors"}
                  id={"employeeInsuranceCos"}
                  value={value}
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
                  <FormInput
                    type={""}
                    label={"Klubbtrekk"}
                    id={clubDeduction}
                    value={value}
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
                <FormInput
                  type={""}
                  label={"Skattetrekk"}
                  id="taxWithholding"
                  value={value}
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
                <FormInput
                  type={""}
                  label={"Netto Utbetalt"}
                  id={"netSalary"}
                  value={value}
                />
              )}
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
}
