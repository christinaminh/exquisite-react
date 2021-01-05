import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = ({ index, sendSubmission, fields }) => {


  const [formFields, setFormFields] = useState({
    adj1: '',
    noun1: '',
    adv: '',
    verb: '',
    adj2: '',
    noun2: ''
  });

  const onInputChange = event => {
    const { name, value } = event.target;

    const newFormFields = {
      ...formFields,
    };

    newFormFields[name] = value;
    setFormFields(newFormFields);
  }

  const onFormSubmit = event => {
    event.preventDefault();

    const poem = fields.map(field => {
      const submittedFields = {...formFields};
      if (field.key) {
        return submittedFields[field.key]
      } else {
        return field
      }
    }).join(' ');

    sendSubmission(poem);

    setFormFields({
      adj1: '',
      noun1: '',
      adv: '',
      verb: '',
      adj2: '',
      noun2: ''
    });
  }

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{index}</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={onFormSubmit}>

        <div className="PlayerSubmissionForm__poem-inputs">

          {
            fields.map(field => (
              field.placeholder ? <input
                key={field.key}
                placeholder={field.placeholder}
                type="text"
                name={field.key}
                onChange={onInputChange}
                value={ formFields[field.key] || ''}
                className={ formFields[field.key] ? 'PlayerSubmissionFormt__input' : 'PlayerSubmissionFormt__input--invalid'} />
                : field
            ))
          }

        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
