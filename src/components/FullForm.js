import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import FormDisplay from "./FormDisplay";

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
  } = formData;

  return (
    <>
      <Col lg={4}>
        <section className="panel">
          <h2 className="panel-title">Grunnlag</h2>
          <Form>
            <FormDisplay
              type="numeric"
              label="Offshoretimer"
              id="offTime"
              errors={errors}
              value={offTime}
              suffix=" t"
              handleValidation={handleValidation}
            />
            <FormDisplay
              type="numeric"
              label="Overtid offshore"
              id="overtimeOffshoreHours"
              errors={errors}
              suffix=" t"
              handleValidation={handleValidation}
              value={overtimeOffshoreHours}
            />
            <FormDisplay
              type="numeric"
              label="Offshoretillegg"
              id="offshorePremium"
              errors={errors}
              suffix=" kr"
              value={offshorePremium}
              handleValidation={handleValidation}
            />
            <FormDisplay
              type="numeric"
              label="Reise"
              id="travelExpenses"
              errors={errors}
              value={travelExpenses}
              suffix=" kr"
              handleValidation={handleValidation}
            />
            <FormDisplay
              type="numeric"
              label="Timesats"
              id="hourlyRate"
              errors={errors}
              suffix=" kr"
              value={hourlyRate}
              handleValidation={handleValidation}
            />
            <FormDisplay
              type="numeric"
              label="VO timer"
              id="safetyRepresentativeHours"
              errors={errors}
              suffix=" t"
              value={safetyRepresentativeHours}
              handleValidation={handleValidation}
            />
            <FormDisplay
              type="numeric"
              label="Skatt"
              id="taxPercentage"
              errors={errors}
              suffix=" %"
              value={taxPercentage}
              handleValidation={handleValidation}
            />
          </Form>
        </section>
      </Col>

      <Col lg={3}>
        <section className="panel panel-muted">
          <h2 className="panel-title">Timer og valg</h2>
          <Form>
            <FormDisplay
              type="text"
              label="Redusert årsverk"
              value={reducedAnnualWork}
              suffix=" t"
              id="reducedAnnualWork"
            />
            <FormDisplay
              type="text"
              label="Sum timer"
              value={totalOffshoreHours}
              suffix=" t"
              id="totalOffshoreHours"
            />

            <hr className="section-divider" />

            <h2 className="panel-title">Fagforening</h2>
            <div className="union-options">
              <FormDisplay
                label="FF"
                id="union-ff"
                type="radio"
                name="unionName"
                defaultChecked
                onChange={() => setUnionName("FF")}
              />
              <FormDisplay
                onChange={() => setUnionName("Safe")}
                label="Safe"
                name="unionName"
                type="radio"
                id="union-safe"
              />
              <FormDisplay
                onChange={() => setUnionName("Parat")}
                label="Parat"
                name="unionName"
                type="radio"
                id="union-parat"
              />
              <FormDisplay
                onChange={() => setUnionName("UO")}
                label="UO"
                name="unionName"
                type="radio"
                id="union-uo"
              />
            </div>
          </Form>
        </section>
      </Col>

      <Col lg={5}>
        <section className="panel panel-summary">
          <h2 className="panel-title">Lønnsoversikt</h2>
          <Form>
            <FormDisplay
              type="text"
              value={monthlySalary}
              suffix=" kr"
              label="Månedslønn"
              id="monthlySalary"
            />
            {travelExpenses > 0 && (
              <FormDisplay
                type="text"
                value={travelExpenses}
                suffix=" kr"
                label="Reiseoppgjør"
                id="travelExpensesSummary"
              />
            )}
            {offTime > 0 && (
              <FormDisplay
                type="text"
                value={reducedAnnualWorkAmount}
                suffix=" kr"
                label="Redusert årsverk"
                id="reducedAnnualWorkAmount"
              />
            )}
            {overtimeBaseSalary > 0 && (
              <FormDisplay
                value={overtimeBaseSalary}
                type="text"
                suffix=" kr"
                label="Overtid grunnlønn"
                id="overtimeBaseSalary"
              />
            )}
            {overtimeExtraPercentage > 0 && (
              <FormDisplay
                value={overtimeExtraPercentage}
                label="Overtid 100%"
                type="text"
                suffix=" kr"
                id="overtimeExtraPercentage"
              />
            )}
            {offTime > 0 && (
              <FormDisplay
                value={totalOffshorePremium}
                label="Offshoretillegg"
                type="text"
                suffix=" kr"
                id="totalOffshorePremium"
              />
            )}
            {srAmount > 0 && (
              <FormDisplay
                value={srAmount}
                label="Verneombud"
                type="text"
                suffix=" kr"
                id="srAmount"
              />
            )}

            <hr className="section-divider" />

            <FormDisplay
              value={grossTotal}
              label="Brutto"
              type="text"
              suffix=" kr"
              id="grossTotal"
            />
            {unionFees !== 0 && (
              <FormDisplay
                value={unionFees}
                label="Fagforening"
                type="text"
                suffix=" kr"
                id="unionFees"
              />
            )}
            <FormDisplay
              value={employeeInsuranceCost}
              label="Egenandel forsikring"
              type="text"
              suffix=" kr"
              id="employeeInsuranceCost"
            />
            {clubDeduction !== 0 && (
              <FormDisplay
                value={clubDeduction}
                label="Klubbtrekk"
                type="text"
                suffix=" kr"
                id="clubDeduction"
              />
            )}
            <FormDisplay
              value={taxWithholding}
              type="text"
              label="Skattetrekk"
              suffix=" kr"
              id="taxWithholding"
            />
            <FormDisplay
              value={netSalary}
              type="text"
              label="Netto utbetalt"
              suffix=" kr"
              id="netSalary"
              highlight
            />
          </Form>
        </section>
      </Col>
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
