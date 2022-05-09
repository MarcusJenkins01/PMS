import TextInput from "../../../../Forms/Inputs/TextInput";
import ButtonSection from "../../Shared/ButtonSection";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";
import Form from "../../../../Forms/Form";
import SubTextError from "../../../../Forms/SubTextError";
import { useState } from 'react';

import http from "../../../../../axios-configuration";

const AddParkingLot = (props) => {
  const [errorText, setErrorText] = useState("");

  const addLot = (formData) => {
    if (formData.lotName.length === 0) {
      setErrorText("Please enter a name");
      return;
    }

    http.post('/admin/addlot', formData).then(res => {
      if (res.data.err) {
        setErrorText(res.data.info);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <div id="add-lot-modal">
      <Form process={addLot} disableStyling={true}>
        <TextInput name="lotName">Parking lot name</TextInput>

        <ButtonSection>
          <RoundedButton colour="green" submit={true}>CONFIRM</RoundedButton>
          <RoundedButton colour="red" onClick={() => props.setAddingState(false)}>CANCEL</RoundedButton>
        </ButtonSection>

        { errorText.length > 0 ? <SubTextError errorText={errorText}/> : <></> }
      </Form>
    </div>
  );
};

export default AddParkingLot;