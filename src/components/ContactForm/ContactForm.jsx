import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/actions';
import { FormContact, FormButton } from './ContactForm.styled';


export default function ContactForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const contacts = useSelector(state => state.contacts);

    const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

    const handleSubmit = e => {
        e.preventDefault();

        if (contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase()
        )) {
            alert(`${name} is already in contacts.`);
        } else if (contacts.find(
            contact => contact.number === number)) {
            alert(`This number ${number} is already in contacts`);
        } else {
            dispatch(addContact({ name, number }));
        };
        reset();
    };

    const reset = () => {
        setName('')
        setNumber('')
    };

    return (
        <FormContact onSubmit={handleSubmit}>
            <label>
                Name
                <br />
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer"
                    required
                    value={name}
                    onChange={handleChange}
                />
            </label>
            <br />            
            <label> Number
                <br />
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                    value={number}
                    onChange={handleChange}
                />
            </label>
            <br />
            <FormButton type="submit">
                Add contact
            </FormButton>         
        </FormContact>
    );
};