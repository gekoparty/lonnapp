import Form from "react-bootstrap/Form";
import FormDisplay from "./FormDisplay";

const FullForm = ({ ...props }) => {
  console.log(props);
  return (
    <div>
      <Form>
        <FormDisplay
          type={"numeric"}
          controlId={"offtime"}
          label={"Off/Timer"}
          id={"offTime"}
          errors={props.errors}
          value={props.offTime}
          suffix={" T"}
          handleValidation={props.handleValidation}
        />

        <FormDisplay
          type={"numeric"}
          controlId={"overtimeOffshoreHours"}
          label={"Overtid Off"}
          id={"overtimeOffshoreHours"}
          errors={props.errors}
          suffix={" T"}
          handleValidation={props.handleValidation}
          value={props.overtimeOffshoreHours}
        />

        <FormDisplay
          type={"numeric"}
          label={"Off/Tillegg"}
          min={0}
          controlId={"offshorePremium"}
          id={"offshorePremium"}
          errors={props.errors}
          suffix={" Kr"}
          value={props.offshorePremium}
          handleValidation={props.handleValidation}
        />

        <FormDisplay
          type={"numeric"}
          controlId={"travelExpenses"}
          label={"Reise"}
          id={"travelExpenses"}
          errors={props.errors}
          value={props.travelExpenses}
          suffix={" Kr"}
          handleValidation={props.handleValidation}
        />

        <FormDisplay
          type={"numeric"}
          controlId={"hourlyRate"}
          label={"Timesats"}
          id={"hourlyRate"}
          errors={props.errors}
          suffix={" Kr"}
          value={props.hourlyRate}
          handleValidation={props.handleValidation}
        />

        <FormDisplay
          type={"numeric"}
          controlId={"afetyRepresentativeHours"}
          label={"VO Timer"}
          id={"safetyRepresentativeHours"}
          errors={props.errors}
          suffix={" T"}
          value={props.safetyRepresentativeHours}
          handleValidation={props.handleValidation}
        />

        <FormDisplay
          type={"numeric"}
          controlId={"taxPercentage"}
          label={"Skatt"}
          id={"taxPercentage"}
          errors={props.errors}
          suffix={" %"}
          value={props.taxPercentage}
          handleValidation={props.handleValidation}
        />

        <h4>Fagforening</h4>
        <div>
          <FormDisplay
            label="FF"
            id={"group1"}
            type={"radio"}
            name={"group1"}
            defaultChecked={true}
            onChange={(e) => props.setUnionName("FF")}
          />

          <FormDisplay
            onChange={(e) => props.setUnionName("Safe")}
            label="Safe"
            name="group1"
            type={"radio"}
            id={"group2"}
          />

          <FormDisplay
            onChange={(e) => props.setUnionName("Parat")}
            label="Parat"
            name="group1"
            type={"radio"}
            id={"group3"}
          />
          <FormDisplay
            onChange={(e) => props.setUnionName("UO")}
            label="UO"
            name="group1"
            type={"radio"}
            id={"group3"}
          />
        </div>
      </Form>

      
      {/* <Form>
            <FormDisplay
              type={"text"}
              label={"Redusert Årsverk"}
              value={props.reducedAnnualWork}
              suffix={" T"}
              id={"reducedAnnualWork"}
            />
            <FormDisplay
              type={"text"}
              label={"Sum Timer"}
              value={props.totalOffshoreHours}
              suffix={" T"}
              id={"totalOffshoreHours"}
            />
          </Form> */}
    </div>
  );
};

export default FullForm;
