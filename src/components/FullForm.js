import Form from "react-bootstrap/Form";
import FormDisplay from "./FormDisplay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";

const unions = ["FF", "Safe", "Parat", "UO", "Lederne"];

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
    position,
    øvelseHours,
    offshoreDays,
    unionName,
    taxableBenefits,
  } = formData;

  return (
    <>
      {/* Top controls (clean + compact) */}
      <Row className="g-3 align-items-stretch mb-3">
        <Col xs={12} lg={8}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="py-3">
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Label className="fw-semibold mb-1">Stilling</Form.Label>
                  <Form.Select
                    value={position}
                    onChange={(e) => handleValidation("position", e.target.value)}
                  >
                    <option value="operatør">Operatør</option>
                    <option value="leder">Leder</option>
                  </Form.Select>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Label className="fw-semibold mb-1">Fagforening</Form.Label>
                  <Form.Select
                    value={unionName}
                    onChange={(e) => setUnionName(e.target.value)}
                  >
                    {unions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <div className="mt-3 d-flex flex-wrap gap-2">
                <Badge bg="dark" pill>
                  {position === "leder" ? "Leder" : "Operatør"}
                </Badge>
                <Badge bg="primary" pill>
                  {unionName}
                </Badge>
                <Badge bg="secondary" pill>
                  Skatt: {taxPercentage}%
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick summary (make Netto the hero) */}
        <Col xs={12} lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="py-3">
              <div className="text-muted small">Netto utbetalt</div>
              <div className="display-6 fw-bold lh-1">
                <FormDisplay
                  type="text"
                  value={netSalary}
                  suffix=" Kr"
                  id="netSalaryHero"
                  label={null}
                  compact
                />
              </div>
              <div className="mt-2">
                <Stack direction="horizontal" gap={2} className="justify-content-between">
                  <span className="text-muted small">Brutto</span>
                  <span className="fw-semibold">
                    <FormDisplay
                      type="text"
                      value={grossTotal}
                      suffix=" Kr"
                      id="grossTotalMini"
                      label={null}
                      compact
                    />
                  </span>
                </Stack>

                <Stack direction="horizontal" gap={2} className="justify-content-between">
                  <span className="text-muted small">Skattetrekk</span>
                  <span className="fw-semibold">
                    <FormDisplay
                      type="text"
                      value={taxWithholding}
                      suffix=" Kr"
                      id="taxWithholdingMini"
                      label={null}
                      compact
                    />
                  </span>
                </Stack>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        {/* Inputs */}
        <Col xs={12} lg={7}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-0 pb-0">
              <h6 className="mb-0">Inndata</h6>
              <div className="text-muted small">Fyll inn det som gjelder for perioden.</div>
            </Card.Header>

            <Card.Body>
              <Accordion defaultActiveKey="timer" alwaysOpen>
                <Accordion.Item eventKey="timer">
                  <Accordion.Header>Timer</Accordion.Header>
                  <Accordion.Body>
                    <Row className="g-3">
                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Off/Timer"
                          id="offTime"
                          errors={errors}
                          value={offTime}
                          suffix=" T"
                          handleValidation={handleValidation}
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Overtid Off"
                          id="overtimeOffshoreHours"
                          errors={errors}
                          suffix=" T"
                          handleValidation={handleValidation}
                          value={overtimeOffshoreHours}
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Øvelse timer"
                          id="øvelseHours"
                          errors={errors}
                          value={øvelseHours}
                          suffix=" T"
                          handleValidation={handleValidation}
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="VO timer"
                          id="safetyRepresentativeHours"
                          errors={errors}
                          suffix=" T"
                          value={safetyRepresentativeHours}
                          handleValidation={handleValidation}
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Offshore dager"
                          id="offshoreDays"
                          errors={errors}
                          value={offshoreDays}
                          suffix=" d"
                          handleValidation={handleValidation}
                        />
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="satser">
                  <Accordion.Header>Satser & tillegg</Accordion.Header>
                  <Accordion.Body>
                    <Row className="g-3">
                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Timesats"
                          id="hourlyRate"
                          errors={errors}
                          suffix=" Kr"
                          value={hourlyRate}
                          handleValidation={handleValidation}
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Off/Tillegg"
                          id="offshorePremium"
                          errors={errors}
                          suffix=" Kr"
                          value={offshorePremium}
                          handleValidation={handleValidation}
                        />
                      </Col>

                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Reise"
                          id="travelExpenses"
                          errors={errors}
                          value={travelExpenses}
                          suffix=" Kr"
                          handleValidation={handleValidation}
                        />
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="skatt">
                  <Accordion.Header>Skatt & trekk</Accordion.Header>
                  <Accordion.Body>
                    <Row className="g-3">
                      <Col xs={12} md={6}>
                        <FormDisplay
                          type="numeric"
                          label="Skatt"
                          id="taxPercentage"
                          errors={errors}
                          suffix=" %"
                          value={taxPercentage}
                          handleValidation={handleValidation}
                        />
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>

        {/* Results (sticky on desktop) */}
        <Col xs={12} lg={5}>
          <div className="position-lg-sticky" style={{ top: 16 }}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-0 pb-0">
                <h6 className="mb-0">Resultat</h6>
                <div className="text-muted small">Beregnet basert på inndata.</div>
              </Card.Header>

              <Card.Body>
                <Form>
                  <FormDisplay type="text" value={monthlySalary} suffix=" Kr" label="Månedslønn" id="monthlySalary" />

                  {position !== "leder" && (
                    <FormDisplay
                      type="text"
                      label="Redusert årsverk"
                      value={reducedAnnualWork}
                      suffix=" T"
                      id="reducedAnnualWork"
                    />
                  )}

                  {offTime > 0 && (
                    <FormDisplay
                      type="text"
                      value={reducedAnnualWorkAmount}
                      suffix=" Kr"
                      label="Beløp red/verk"
                      id="reducedAnnualWorkAmount"
                    />
                  )}

                  {(totalOffshoreHours + øvelseHours) > 0 && (
                    <FormDisplay
                      type="text"
                      label="Sum timer"
                      value={totalOffshoreHours + øvelseHours}
                      suffix=" T"
                      id="sumHours"
                    />
                  )}

                  {overtimeBaseSalary > 0 && (
                    <FormDisplay type="text" value={overtimeBaseSalary} suffix=" Kr" label="Overtid grunnlønn" id="overtimeBaseSalary" />
                  )}
                  {overtimeExtraPercentage > 0 && (
                    <FormDisplay type="text" value={overtimeExtraPercentage} suffix=" Kr" label="Overtid 100%" id="overtimeExtra100" />
                  )}
                  {offTime > 0 && (
                    <FormDisplay type="text" value={totalOffshorePremium} suffix=" Kr" label="Off/Tillegg" id="offshoreTillegg" />
                  )}
                  {srAmount > 0 && (
                    <FormDisplay type="text" value={srAmount} suffix=" Kr" label="Verneombud" id="srAmount" />
                  )}
                  {offshoreDays > 0 && (
                    <FormDisplay type="text" value={taxableBenefits} suffix=" Kr" label="Skattepliktig gode" id="taxableBenefits" />
                  )}

                  <hr />

                  <FormDisplay type="text" value={grossTotal} label="Brutto" suffix=" Kr" id="grossTotal" />

                  {unionFees !== 0 && (
                    <FormDisplay type="text" value={unionFees} label="Fagforening" suffix=" Kr" id="unionFees" />
                  )}

                  <FormDisplay type="text" value={employeeInsuranceCost} label="Egenandel fors" suffix=" Kr" id="employeeInsuranceCost" />

                  {clubDeduction !== 0 && (
                    <FormDisplay type="text" value={clubDeduction} label="Klubbtrekk" suffix=" Kr" id="clubDeduction" />
                  )}

                  <hr />

                  <FormDisplay type="text" value={taxWithholding} label="Skattetrekk" suffix=" Kr" id="taxWithholding" />

                  <hr />

                  <div className="p-3 rounded-3 bg-light">
                    <div className="text-muted small">Netto utbetalt</div>
                    <div className="h3 fw-bold mb-0">
                      <FormDisplay type="text" value={netSalary} label={null} suffix=" Kr" id="netSalary" compact />
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
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
