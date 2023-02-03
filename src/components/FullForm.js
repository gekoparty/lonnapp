import Form from "react-bootstrap/Form";
import FormDisplay from "./FormDisplay";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';

const FullForm = ({ formData, handleValidation, errors, setUnionName }) => {
    console.log(formData)
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
      } = formData;
  return (
    <>
    <Col lg={3}>
        
      <Form >
        <FormDisplay
        key={key}
          type={"numeric"}
          controlId={"offtime"}
          label={"Off/Timer"}
          id={"offTime"}
          errors={errors}
          value={offTime}
          suffix={" T"}
          handleValidation={handleValidation}
        />

        <FormDisplay
        key={key}
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
        key={key}
          type={"numeric"}
          label={"Off/Tillegg"}
          min={0}
          controlId={"offshorePremium"}
          id={"offshorePremium"}
          errors={errors}
          suffix={" Kr"}
          value={offshorePremium}
          handleValidation={handleValidation}
        />

        <FormDisplay
        key={key}
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
        key={key}
          type={"numeric"}
          controlId={"hourlyRate"}
          label={"Timesats"}
          id={"hourlyRate"}
          errors={errors}
          suffix={" Kr"}
          value={hourlyRate}
          handleValidation={handleValidation}
        />

        <FormDisplay
        key={key}
          type={"numeric"}
          controlId={"safetyRepresentativeHours"}
          label={"VO Timer"}
          id={"safetyRepresentativeHours"}
          errors={errors}
          suffix={" T"}
          value={safetyRepresentativeHours}
          handleValidation={handleValidation}
        />

        <FormDisplay
        key={key}
          type={"numeric"}
          controlId={"taxPercentage"}
          label={"Skatt"}
          id={"taxPercentage"}
          errors={errors}
          suffix={" %"}
          value={taxPercentage}
          handleValidation={handleValidation}
        />

        <h4>Fagforening</h4>
        <div>
          <FormDisplay
            label="FF"
            id={"group1"}
            type={"radio"}
            name={"group1"}
            defaultChecked={true}
            onChange={() => setUnionName("FF")}
          />

          <FormDisplay
            onChange={() => setUnionName("Safe")}
            label="Safe"
            name="group1"
            type={"radio"}
            id={"group2"}
          />

          <FormDisplay
            onChange={() => setUnionName("Parat")}
            label="Parat"
            name="group1"
            type={"radio"}
            id={"group3"}
          />
          <FormDisplay
            onChange={(e) => setUnionName("UO")}
            label="UO"
            name="group1"
            type={"radio"}
            id={"group3"}
          />
          </div>
          </Form>
        </Col>
      
      <Col lg={4}>
        <Form >
          <FormDisplay
          key={key}
            type={"text"}
            label={"Redusert Årsverk"}
            value={reducedAnnualWork}
            suffix={" T"}
            id={"reducedAnnualWork"}
          />

          <FormDisplay
          key={key}
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
            key={key}
              type={"text"}
              value={monthlySalary}
              suffix={" Kr"}
              label={"Månedslønn"}
              id={"monthlySalary"}
            />
            {travelExpenses > 0 ? (
              <FormDisplay
              key={key}
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
              key={key}
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
              key={key}
                value={overtimeBaseSalary}
                type={"text"}
                suffix={" Kr"}
                label={"Overtid Grunnlønn"}
                id={"overtimeBaseSalary"}
              />
            )}
            {overtimeExtraPercentage > 0 && (
              <FormDisplay
              key={key}
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
              key={key}
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
              key={key}
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
            key={key}
              value={grossTotal}
              label={"Brutto"}
              type={"text"}
              suffix={" Kr"}
              id={"grossTotal"}
            />
            {unionFees !== 0 ? (
              <FormDisplay
              key={key}
                value={unionFees}
                label={"Fagforening"}
                type={"text"}
                suffix={" Kr"}
              />
            ) : (
              ""
            )}
            <FormDisplay
            key={key}
              value={employeeInsuranceCost}
              label={"Egenandel Fors"}
              type={"text"}
              suffix={" Kr"}
              id={"emplyeeInsuranceCos"}
            />
            {clubDeduction !== 0 ? (
              <FormDisplay
              key={key}
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
            key={key}
              value={taxWithholding}
              type={"text"}
              label={"Skattetrekk"}
              suffix={" Kr"}
              id={"taxWithholding"}
            />
            <hr />
            <FormDisplay
              key={key}
              value={netSalary}
              type={"text"}
              label={"Netto Utbetalt"}
              suffix={" Kr"}
              id={"netSalary"}
            />
          </Form>
        </Col>
    
      </>
  );
 
  
};
  

export default FullForm;

FullForm.propTypes = {
 formData: PropTypes.object,
 handleValidation: PropTypes.func,
 errors: PropTypes.object
  

}
