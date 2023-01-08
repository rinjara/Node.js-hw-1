const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(result);
};

const getContactById = async contactId => {
  const id = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === id);
  return result || null;
};

const removeContact = async contactId => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    console.log(index);
    return null;
  } else {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  const result = await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
