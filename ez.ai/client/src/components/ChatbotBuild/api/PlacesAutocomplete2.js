import React, { useRef } from "react";
import produce from "immer";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
//콤보박스 css(검색창)
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import useOnclickOutside from "react-cool-onclickoutside";

const PlacesAutocomplete2 = ({
  google,
  keywordObject,
  setKeywordObject,
  index,
  now,
  i,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const ref = useRef();
  useOnclickOutside(ref, () => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
    console.log(e);
  };
  //주소 선택시
  const handleSelect = (val) => {
    setValue(val, false);
    clearSuggestions();
    getGeocode({ address: val })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setKeywordObject(
          produce(keywordObject, (draft) => {
            draft[index].contents[now].title = val;
            draft[index].contents[now].latitude = lat;
            draft[index].contents[now].longtitude = lng;
          })
        );
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete2;
