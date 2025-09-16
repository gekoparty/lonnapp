import Form from "react-bootstrap/Form";
import FormDisplay from "./FormDisplay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import PropTypes from "prop-types";

const FullForm = ({ formData, handleValidation, errors, setUnionName }) => {
  const {
    taxPercentage,
    safetyRepresentativeHours,
    hourlyRate,
    travelExpenses,
    offshorePremium,
    offTime,
    overtimeOffshoreHours,
    totalOffshoreHours,
    reducedAnnualWork,
    reducedAnnualWorkAmount,
    totalOffshorePremium,
    monthlySalary,
    netSalary,
    unionFees,
    grossTotal,
    clubDeduction,
    taxWithholding,
    srAmount,
    overtimeBaseSalary,
    overtimeExtraPercentage,
    employeeInsuranceCost,
    key,
    position,
    øvelseHours,
    offshoreDays,
  } = formData;

  return (
    <>
      {/* === POSITION SELECTOR === */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-3 shadow-sm">
            <h6 className="text-center mb-3">Stilling</h6>
            <ToggleButtonGroup
              type="radio"
              name="positionGroup"
              value={position}
              className="d-flex justify-content-center gap-3"
              onChange={(val) => handleValidation("position", val)}
            >
              <ToggleButton
                id="pos-operator"
                value="operatør"
                variant="outline-dark"
              >
                Operatør
              </ToggleButton>
              <ToggleButton id="pos-leder" value="leder" variant="outline-dark">
                Leder
              </ToggleButton>
            </ToggleButtonGroup>
          </Card>
        </Col>
      </Row>

      {/* === UNION SELECTOR === */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-3 shadow-sm">
            <h6 className="text-center mb-3">Fagforening</h6>
            <ToggleButtonGroup
              type="radio"
              name="unionGroup"
              value={formData.unionName}
              className="d-flex flex-wrap justify-content-center gap-2"
              onChange={(val) => setUnionName(val)}
            >
              {["FF", "Safe", "Parat", "UO", "Lederne"].map((union) => (
                <ToggleButton
                  key={union}
                  id={`union-${union}`}
                  value={union}
                  variant="outline-primary"
                  className="px-3"
                >
                  {union}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Card>
        </Col>
      </Row>

      {/* === THREE-COLUMN LAYOUT === */}
      <Row>
        {/* === INPUTS COLUMN === */}
        <Col lg={3}>
          <Card className="p-3 shadow-sm mb-3">
            <h6 className="mb-3 text-center">Input</h6>
            <Form>
              <FormDisplay
                key={key}
                type="numeric"
                label="Off/Timer"
                id="offTime"
                errors={errors}
                value={offTime}
                suffix=" T"
                handleValidation={handleValidation}
              />

              <FormDisplay
                key={key}
                type="numeric"
                label="Overtid Off"
                id="overtimeOffshoreHours"
                errors={errors}
                suffix=" T"
                handleValidation={handleValidation}
                value={overtimeOffshoreHours}
              />

              <FormDisplay
                key={key}
                type="numeric"
                label="Off/Tillegg"
                id="offshorePremium"
                errors={errors}
                suffix=" Kr"
                value={offshorePremium}
                handleValidation={handleValidation}
              />
              <FormDisplay
                key={key}
                type="numeric"
                label="Øvelse Timer"
                id="øvelseHours"
                errors={errors}
                value={øvelseHours}
                suffix=" T"
                handleValidation={handleValidation}
              />

              <FormDisplay
                key={key}
                type="numeric"
                label="Reise"
                id="travelExpenses"
                errors={errors}
                value={travelExpenses}
                suffix=" Kr"
                handleValidation={handleValidation}
              />

              <FormDisplay
                key={key}
                type="numeric"
                label="Timesats"
                id="hourlyRate"
                errors={errors}
                suffix=" Kr"
                value={hourlyRate}
                handleValidation={handleValidation}
              />

              <FormDisplay
                key={key}
                type="numeric"
                label="VO Timer"
                id="safetyRepresentativeHours"
                errors={errors}
                suffix=" T"
                value={safetyRepresentativeHours}
                handleValidation={handleValidation}
              />
              <FormDisplay
                key={key}
                type="numeric"
                label="Offshore Dager"
                id="offshoreDays"
                errors={errors}
                value={offshoreDays}
                suffix=" d"
                handleValidation={handleValidation}
              />

              <FormDisplay
                key={key}
                type="numeric"
                label="Skatt"
                id="taxPercentage"
                errors={errors}
                suffix=" %"
                value={taxPercentage}
                handleValidation={handleValidation}
              />
            </Form>
          </Card>
        </Col>

        {/* === HOURS / INTERMEDIATE COLUMN === */}
        <Col lg={3}>
          <Card className="p-3 shadow-sm mb-3">
            <h6 className="mb-3 text-center">Timer</h6>
            <Form>
              {position !== "leder" && (
                <FormDisplay
                  key={key}
                  type="text"
                  label="Redusert Årsverk"
                  value={reducedAnnualWork}
                  suffix=" T"
                  id="reducedAnnualWork"
                />
              )}
              <FormDisplay
                key={key}
                type="text"
                label="Sum Timer"
                value={totalOffshoreHours + øvelseHours}
                suffix=" T"
                id="totalOffshoreHours"
              />
            </Form>
          </Card>
        </Col>

        {/* === OUTPUTS COLUMN === */}
        <Col lg={4}>
          <Card className="p-3 shadow-sm mb-3">
            <h6 className="mb-3 text-center">Resultat</h6>
            <Form>
              <FormDisplay
                key={key}
                type="text"
                value={monthlySalary}
                suffix=" Kr"
                label="Månedslønn"
                id="monthlySalary"
              />

              {travelExpenses > 0 && (
                <FormDisplay
                  key={key}
                  type="text"
                  value={travelExpenses}
                  suffix=" Kr"
                  label="ReiseOpp"
                  id="travelExpenses"
                />
              )}

              {offTime > 0 && (
                <FormDisplay
                  key={key}
                  type="text"
                  value={reducedAnnualWorkAmount}
                  suffix=" Kr"
                  label="Beløp Red/Verk"
                  id="reducedAnnualWorkAmount"
                />
              )}

              {overtimeBaseSalary > 0 && (
                <FormDisplay
                  key={key}
                  value={overtimeBaseSalary}
                  type="text"
                  suffix=" Kr"
                  label="Overtid Grunnlønn"
                  id="overtimeBaseSalary"
                />
              )}
              {overtimeExtraPercentage > 0 && (
                <FormDisplay
                  key={key}
                  value={overtimeExtraPercentage}
                  label="Overtid 100%"
                  type="text"
                  suffix=" Kr"
                  decimalScale={2}
                  id="overtidEkstra100"
                />
              )}
              {offTime > 0 && (
                <FormDisplay
                  key={key}
                  value={totalOffshorePremium}
                  label="Off/Tillegg"
                  type="text"
                  suffix=" Kr"
                  id="offshoreTillegg"
                />
              )}
              {srAmount > 0 && (
                <FormDisplay
                  key={key}
                  value={srAmount}
                  label="Verneombud"
                  type="text"
                  suffix=" Kr"
                  id="srAmount"
                />
              )}
              {offshoreDays > 0 && (
                <FormDisplay
                  key={key}
                  value={formData.taxableBenefits}
                  label="Skattepliktig Gode"
                  type="text"
                  suffix=" Kr"
                  id="taxableBenefits"
                />
              )}

              <hr />
              <FormDisplay
                key={key}
                value={grossTotal}
                label="Brutto"
                type="text"
                suffix=" Kr"
                id="grossTotal"
              />
              {unionFees !== 0 && (
                <FormDisplay
                  key={key}
                  value={unionFees}
                  label="Fagforening"
                  type="text"
                  suffix=" Kr"
                />
              )}
              <FormDisplay
                key={key}
                value={employeeInsuranceCost}
                label="Egenandel Fors"
                type="text"
                suffix=" Kr"
                id="employeeInsuranceCost"
              />
              {clubDeduction !== 0 && (
                <FormDisplay
                  key={key}
                  value={clubDeduction}
                  label="Klubbtrekk"
                  type="text"
                  suffix=" Kr"
                  id="clubDeduction"
                />
              )}
              <hr />
              <FormDisplay
                key={key}
                value={taxWithholding}
                type="text"
                label="Skattetrekk"
                suffix=" Kr"
                id="taxWithholding"
              />
              <hr />
              <FormDisplay
                key={key}
                value={netSalary}
                type="text"
                label="Netto Utbetalt"
                suffix=" Kr"
                id="netSalary"
              />
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FullForm;

FullForm.propTypes = {
  formData: PropTypes.object,
  handleValidation: PropTypes.func,
  errors: PropTypes.object,
  setUnionName: PropTypes.func,
};
