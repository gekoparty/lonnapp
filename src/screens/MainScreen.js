import React, { useEffect, useReducer, useState, setState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormInput from "../components/FormInput";
import schema from "../validations/schema";
import useValidate from "../validations/useValidate";


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

  const employeeInsuranceCost = -39;

  useEffect(() => {
    const calculateLonn = () => {
      const brutto = (
        monthlySalary +
        reducedAnnualWorkAmount +
        overtimeBaseSalary +
        overtimeExtraPercentage +
        totalOffshorePremium +
        srAmount +
        Number(travelExpenses)
      ).toFixed(2);

      setMonthlySalary(Number(162.5 * hourlyRate));
      setReducedAnnualWork(Number((offTime * 9.332) / 100).toFixed(2));
      setReducedAnnualWorkAmount(
        -Number(reducedAnnualWork * hourlyRate).toFixed(2)
      );
      setSrAmount(safetyRepresentativeHours * 15);
      setOvertimeBaseSalary(Number(overtimeOffshoreHours * hourlyRate));
      setOvertimeExtraPercentage(Number(overtimeBaseSalary));
      setTotalOffshorePremium(
        Number((offshorePremium * totalOffshoreHours).toFixed(2))
      );
      setTaxWithholding(-Number(brutto * taxPercentage) / 100);
      setTotalOffshoreHours(Number(offTime + overtimeOffshoreHours));
      setGrossTotal(Number(brutto));

      //check unionName
      if (unionName === "FF") {
        setUnionFees(
          -Number(((brutto - travelExpenses) * 1.5) / 100).toFixed(2)
        );
      } else if (unionName === "Safe") {
        setUnionFees(-Number(460));
        setClubDeduction(-Number(40));
      } else if (unionName === "Parat") {
        setUnionFees(-Number(520));
        setClubDeduction(-Number(40));
      } else {
        setUnionFees(Number(0));
        setClubDeduction(Number(0));
      }

      setNetSalary(
        Number(
          grossTotal +
            taxWithholding +
            clubDeduction +
            employeeInsuranceCost +
            unionFees
        ).toFixed(2)
      );
    };
    console.log(unionName);

    calculateLonn();
  }, [
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
    overtimeOffshoreHours: {setter: setOvertimeOffshoreHours, validator: validate},
    offshorePremium: {setter: setOffshorePremium, validator: validate},
    travelExpenses: {setter: setTravelExpenses, validator: validate},
    safetyRepresentativeHours: {setter: setSafetyRepresentativeHours, validator: validate},

  }


  const handleValidation = (field, event) => {
    const value = event.target.value;
    fields[field].setter(value);
    fields[field].validator({ [field]: value });
  }


  

  

  return (
    <div className="small-container">
      <Row>
        <Col md={2}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="timer">
              <Form.Label column>Off/Timer</Form.Label>
              <Col>
                <Form.Control
                min={0}
                  className="bg-light"
                  type="number"
                  isInvalid={!!errors.offTime}
                  value={offTime}
                  onChange={(event) => handleValidation("offTime", event)}
                  required
                ></Form.Control>
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
                <Form.Control
                  className="bg-light"
                  type="number"
                  value={overtimeOffshoreHours}
                  onChange={(event) => handleValidation("overtimeOffshoreHours", event)}
                  isInvalid={!!errors.overtimeOffshoreHours}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.overtimeOffshoreHours}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="offshorePremium">
              <Form.Label column>Off/tillegg</Form.Label>
              <Col>
                <Form.Control
                min={0}
                  className="bg-light"
                  type="number"
                  value={offshorePremium}
                  isInvalid={!!errors.offshorePremium}
                  onChange={(event)=>handleValidation("offshorePremium", event)}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.offshorePremium}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="travelExpenses">
              <Form.Label column>Reise</Form.Label>
              <Col>
                <Form.Control
                min={0}
                  className="bg-light"
                  type="number"
                  value={travelExpenses}
                  isInvalid={!!errors.travelExpenses}
                  onChange={(event)=> handleValidation("travelExpenses", event)}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.travelExpenses}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lonn">
              <Form.Label column>TimeSats</Form.Label>
              <Col>
                <Form.Control
                  min={0}
                  onKeyDown={(e) => e.key === "-" && e.preventDefault()}
                  className="bg-light "
                  type="number"
                  value={hourlyRate}
                  onChange={(event)=> handleValidation("hourlyRate", event)}
                  isInvalid={!!errors.hourlyRate}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.hourlyRate}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="safetyHours">
              <Form.Label column>VO Timer</Form.Label>
              <Col>
                <Form.Control
                  min={0}
                  className="bg-light "
                  type="number"
                  value={safetyRepresentativeHours}
                  onChange={(event)=>handleValidation("safetyRepresentativeHours", event)}
                  isInvalid={!!errors.safetyRepresentativeHours}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.safetyRepresentativeHours}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="skatt">
              <Form.Label column>Skatt</Form.Label>
              <Col>
                <Form.Control
                  min={0}
                  max={100}
                  onKeyDown={(e) => e.key === "-" && e.preventDefault()}
                  className="bg-light"
                  type="number"
                  isInvalid={!!errors.taxPercentage}
                  value={taxPercentage}
                  onChange={(event) => handleValidation("taxPercentage", event)} 
                  required
                ></Form.Control>
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
        <Col md={3}>
          {/* <h4>Netto Utbetalt</h4>
          <div>{netSalary}</div> */}
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="skatt">
              <Form.Label column>Redusert Årsverk</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light"
                  type="number"
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
                  type="number"
                  value={totalOffshoreHours}
                  disabled
                ></Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col md={3}>
          <Form>
            <FormInput
              type={""}
              label={"Månedslønn"}
              number={`${monthlySalary} Kr`}
              id={"monthlySalary"}
            ></FormInput>
            {travelExpenses > 0 ? (
              <FormInput
                type={""}
                label={"ReiseOpp"}
                number={`${travelExpenses} Kr`}
                id={"ReiseOpp"}
              ></FormInput>
            ) : (
              ""
            )}

            {offTime > 0 ? (
              <FormInput
                type={""}
                label={"Beløp Red/Verk"}
                number={`${reducedAnnualWorkAmount} Kr`}
                id={"reducedAnnualWorkAmount"}
              ></FormInput>
            ) : (
              ""
            )}

            {overtimeOffshoreHours > 0 ? (
              <>
                <FormInput
                  type={""}
                  label={"Overtid Grunnlonn"}
                  number={`${overtimeBaseSalary} Kr`}
                  id={"overtimeBaseSalary"}
                ></FormInput>
                <FormInput
                  type={""}
                  label={"Overtid 100%"}
                  number={`${overtimeExtraPercentage} Kr`}
                  id={"overtidEkstra100"}
                ></FormInput>
              </>
            ) : (
              ""
            )}
            {offTime > 0 ? (
              <FormInput
                type={""}
                label={"Off/Tillegg"}
                number={`${totalOffshorePremium} Kr`}
                id={"offshoretillegg"}
              ></FormInput>
            ) : (
              ""
            )}
            {srAmount > 0 ? (
              <FormInput
                type={""}
                label={"VerneOmbud"}
                number={`${srAmount} Kr`}
                id={"srAmount"}
              ></FormInput>
            ) : (
              ""
            )}
            <hr />
            <FormInput
              type={""}
              label={"Brutto Lønn"}
              number={`${grossTotal} Kr`}
              id={"grossTotal"}
            ></FormInput>
            {unionFees !== 0 ? (
              <FormInput
                type={""}
                label={"Fagforening"}
                number={`${unionFees} Kr`}
                id={"unionName"}
              ></FormInput>
            ) : (
              ""
            )}

            <FormInput
              type={""}
              label={"EgenAndel Fors"}
              number={`${employeeInsuranceCost} Kr`}
              id={"employeeInsuranceCost"}
            ></FormInput>
            {clubDeduction !== 0 ? (
              <FormInput
                type={""}
                label={"Klubbtrekk"}
                number={`${clubDeduction} Kr`}
                id={"clubDeduction"}
              ></FormInput>
            ) : (
              ""
            )}

            <hr />
            <FormInput
              type={""}
              label={"Skattetrekk"}
              number={`${taxWithholding.toFixed(2)} Kr`}
              id={"taxWithholding"}
            ></FormInput>
            <hr />
            <FormInput
              type={""}
              label={"Netto Utbetalt"}
              number={`${netSalary} Kr`}
              id={"netSalary"}
            ></FormInput>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
