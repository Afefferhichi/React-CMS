/* eslint-disable no-use-before-define */

import React, {useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function CheckboxesTags(props) {
  useEffect(() => {
  }, [props.options])
  return (
    <Autocomplete
      multiple
      id="checkboxes"
      options={props.options}
      disableCloseOnSelect
      onChange={props.onChange}
      getOptionLabel={(option) => option.text}
      getOptionSelected={(option, option2) => option.text === option2.text}
      defaultValue={props.defaultValue}
      filterSelectedOptions={true}
      renderOption={(option, {selected}) => {
        return (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{marginRight: 8}}
              checked={selected}
            />
            {option.text}
          </React.Fragment>
        );
      }}
      style={{...props.style}}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={props.label} placeholder={props.placeholder}/>
      )}
    />
  );
}
