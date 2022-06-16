import React, { useEffect, useReducer, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormInput from "../components/FormInput";

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default function MainScreen() {
  const [offTimer, setOffTimer] = useState(168);

  const [offTillegg, setOffTillegg] = useState(84.7);
  const [timeSats, setTimesats] = useState(220);
  const [skattProsent, setSkattProsent] = useState(30);

  const [manedsLonn, setManedsLonn] = useState(0);
  const [nettoLonn, setNettoLonn] = useState(0);
  const [redusertArsverk, setRedusertArsverk] = useState(0);
  const [redusertArsverkBelop, setRedusertArsverkBelop] = useState(0);
  const [skatteTrekk, setSkatteTrekk] = useState(0);
  const [overtidTimerOff, setOvertidTimerOff] = useState(0);
  const [sumTimerOff, setSumTimerOff] = useState(0);
  const [overtidGrunnlonn, setOvertidGrunnlonn] = useState(0);
  const [sumOffshoreTillegg, setSumOffshoreTillegg] = useState(0);
  const [overtidProsentEkstra, setOvertidProsentEkstra] = useState(0);
  const [bruttoTotal, setBruttoTotal] = useState(0);
  const [verneOmbudTimer, setVerneombudTimer] = useState(0);
  const [voBelop, setVoBelop] = useState(0);
  const [fagforeningFelles, setFagforeningFelles] = useState(0);
  const [fagforening, setFagForening] = useState('FF');

  const egenAndelForsikring = -39;
  const klubbTrekk = -40;

  useEffect(() => {
    const calculateLonn = () => {
      const brutto = (
        manedsLonn +
        redusertArsverkBelop +
        overtidGrunnlonn +
        overtidProsentEkstra +
        sumOffshoreTillegg +
        voBelop
      ).toFixed(2);

      setManedsLonn(Number(162.5 * timeSats));
      setRedusertArsverk(Number((offTimer * 9.332) / 100).toFixed(2));
      setRedusertArsverkBelop(-Number(redusertArsverk * timeSats).toFixed(2));
      setVoBelop(verneOmbudTimer * 3);
      setOvertidGrunnlonn(Number(overtidTimerOff * timeSats));
      setOvertidProsentEkstra(Number(overtidGrunnlonn));
      setSumOffshoreTillegg(Number((offTillegg * sumTimerOff).toFixed(2)));
      setSkatteTrekk(-Number(brutto * skattProsent) / 100);
      setSumTimerOff(Number(offTimer + overtidTimerOff));
      setBruttoTotal(Number(brutto));
      setFagforeningFelles(-Number((brutto * 1.5) / 100).toFixed(2));
      setNettoLonn(
        Number(
          bruttoTotal +
            skatteTrekk +
            klubbTrekk +
            egenAndelForsikring +
            fagforeningFelles
        ).toFixed(2)
      );
    };
    console.log(fagforening)
    calculateLonn();
  }, [
    bruttoTotal,
    voBelop,
    sumOffshoreTillegg,
    verneOmbudTimer,
    manedsLonn,
    timeSats,
    offTillegg,
    offTimer,
    skattProsent,
    redusertArsverk,
    redusertArsverkBelop,
    skatteTrekk,
    overtidTimerOff,
    overtidGrunnlonn,
    overtidProsentEkstra,
    sumTimerOff,
    fagforeningFelles,
    egenAndelForsikring,
    klubbTrekk,
    fagforening
  ]);

  return (
    <div className="small-container">
      <Row>
        <Col md={2}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="timer">
              <Form.Label column>Off/Timer</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light"
                  type="number"
                  value={offTimer}
                  onChange={(e) => setOffTimer(Number(e.target.value))}
                  required
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="overtidTimerOff">
              <Form.Label column>Overtid Off</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light"
                  type="number"
                  value={overtidTimerOff}
                  onChange={(e) => setOvertidTimerOff(Number(e.target.value))}
                  required
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="offTillegg">
              <Form.Label column>Off/tillegg</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light"
                  type="number"
                  value={offTillegg}
                  onChange={(e) => setOffTillegg(e.target.value)}
                  required
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lonn">
              <Form.Label column>TimeSats</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light "
                  type="number"
                  value={timeSats}
                  onChange={(e) => setTimesats(e.target.value)}
                  required
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lonn">
              <Form.Label column>VO Timer</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light "
                  type="number"
                  value={verneOmbudTimer}
                  onChange={(e) => setVerneombudTimer(e.target.value)}
                  required
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="skatt">
              <Form.Label column>Skatt</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light"
                  type="number"
                  value={skattProsent}
                  onChange={(e) => setSkattProsent(e.target.value)}
                  required
                ></Form.Control>
              </Col>
            </Form.Group>
            <h4>Fagforening</h4>
            <div>
            <Form.Check
              inline
              defaultChecked
              onChange={(e)=>setFagForening("FF")}
              label="FF"
              name="group1"
              type={"radio"}
              id="group1"
            />
            <Form.Check
              inline
              onChange={(e)=>setFagForening("Safe")}
              label="Safe"
              name="group1"
              type={"radio"}
              id="group2"
            />
            <Form.Check
              inline
              onChange={(e)=>setFagForening("Parat")}
              label="Parat"
              name="group1"
              type={"radio"}
              id="group3"
            />
            <Form.Check
              inline
              onChange={(e)=>setFagForening("UO")}
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
          <div>{nettoLonn}</div> */}
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="skatt">
              <Form.Label column>Redusert Årsverk</Form.Label>
              <Col>
                <Form.Control
                  className="bg-light"
                  type="number"
                  value={redusertArsverk}
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
                  value={sumTimerOff}
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
              number={`${manedsLonn} Kr`}
              id={"manedsLonn"}
            ></FormInput>
            {offTimer > 0 ? (
              <FormInput
                type={""}
                label={"Beløp Red/Verk"}
                number={`${redusertArsverkBelop} Kr`}
                id={"redusertArsverkBelop"}
              ></FormInput>
            ) : (
              ""
            )}

            {overtidTimerOff > 0 ? (
              <>
                <FormInput
                  type={""}
                  label={"Overtid Grunnlonn"}
                  number={`${overtidGrunnlonn} Kr`}
                  id={"overtidGrunnlonn"}
                ></FormInput>
                <FormInput
                  type={""}
                  label={"Overtid 100%"}
                  number={`${overtidProsentEkstra} Kr`}
                  id={"overtidEkstra100"}
                ></FormInput>
              </>
            ) : (
              ""
            )}
            {offTimer > 0 ? (
              <FormInput
                type={""}
                label={"Off/Tillegg"}
                number={`${sumOffshoreTillegg} Kr`}
                id={"offshoretillegg"}
              ></FormInput>
            ) : (
              ""
            )}
            {voBelop > 0 ? (
              <FormInput
                type={""}
                label={"VerneOmbud"}
                number={`${voBelop} Kr`}
                id={"voBelop"}
              ></FormInput>
            ) : (
              ""
            )}
            <hr />
            <FormInput
              type={""}
              label={"Brutto Lønn"}
              number={`${bruttoTotal} Kr`}
              id={"bruttoTotal"}
            ></FormInput>
            <FormInput
              type={""}
              label={"Fagforening"}
              number={`${fagforeningFelles} Kr`}
              id={"fagforening"}
            ></FormInput>
            <FormInput
              type={""}
              label={"EgenAndel Fors"}
              number={`${egenAndelForsikring} Kr`}
              id={"egenandelforsikring"}
            ></FormInput>
            <FormInput
              type={""}
              label={"Klubbtrekk"}
              number={`${klubbTrekk} Kr`}
              id={"klubbtrekk"}
            ></FormInput>
            <hr />
            <FormInput
              type={""}
              label={"Skattetrekk"}
              number={`${skatteTrekk.toFixed(2)} Kr`}
              id={"skatteTrekk"}
            ></FormInput>
            <hr />
            <FormInput
              type={""}
              label={"Netto Utbetalt"}
              number={`${nettoLonn} Kr`}
              id={"nettoLonn"}
            ></FormInput>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
